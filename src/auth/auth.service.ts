import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService,
  ) {}

  async signup(
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    const users = await this.usersService.findOne(email);

    if (users) {
      throw new BadRequestException('email in use');
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = await this.usersService.create(username, email, hash);

    const tokens = await this.getTokens(
      newUser._id,
      newUser.username,
      newUser.roles,
      newUser.bio,
      newUser.myCourses
    );
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    
    return tokens;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) { 
      throw new BadRequestException('check credentials and try again'); 
    }
    return user;
  }

  async login(user: any) {
    const tokens = await this.getTokens(user._id, user.username, user.roles, user.bio, user.myCourses);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    const result = await this.usersService.update(userId, { refreshToken: null });
    return result;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltRounds);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: string, username: string, userRole: [], bio: string, myCourses ) {  
   
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          roles: userRole, 
        },
        {
          secret: 'secret',
          expiresIn: '15m',
        },
      ), 
      this.jwtService.signAsync ( 
        {
          sub: userId,
          username,
          roles: userRole,
        },
        {
          secret: 'secret',   
          expiresIn: '7d',
        },  
      ),
    ]);

    return {
      accessToken,
      refreshToken,
      username,
      userId,
      bio,
      myCourses,
      userRole
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);  
    
    if (!user || !user.refreshToken) throw new BadRequestException('Access Denied'); 
    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches)throw new ForbiddenException('Access Denied token does not match');
  
    const tokens = await this.getTokens(user._id, user.username, user.roles, user.bio, user.myCourses);
    await this.updateRefreshToken(user._id, tokens.refreshToken);    
    return tokens;
  }  

}
