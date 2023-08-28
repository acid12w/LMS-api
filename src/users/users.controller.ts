import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Request,
  Res,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
  Patch,
  Session,
} from '@nestjs/common';

import { LocalAuthGuard } from 'src/auth/auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RefreshTokenGuard } from 'src/auth/refreshToken.guard';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

import { UsersDto } from './dtos/create-users.dto';
// import { UpdateUserDto } from './dtos/update-User.dto';


@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/signup')
  async signup(@Body() body: UsersDto) {
    const user = await this.authService.signup( 
      body.username,
      body.email,
      body.password,
    );
    return user;
  }

  @UseGuards(LocalAuthGuard) 
  @Post('/login')
  async login(@Request() req, @Res({ passthrough: true }) response) {   
    const token = await this.authService.login(req.user);  
      
    response.cookie('access-token', token, { httpOnly: true });

    return token;
  }

  @UseGuards(JwtAuthGuard) 
  @Post('/logout')
  async logout(@Request() req) { 
    const result = await this.authService.logout(req.user['sub']);  
  }
  
  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  refreshTokens( @Request() req,
  @Res({ passthrough: true }) res, ) {   
    res.cookie('access-token', req.user, { httpOnly: true });       
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit/:currentUsername')  
  async updateUser(@Param('currentUsername') currentUsername: string, @Body() body) {
    return this.usersService.updateUser(currentUsername, body);   
  }
  
  @Patch('/mycourses/:currentUsername')
  async updateMycourse(@Param('currentUsername') currentUsername: string,  @Body() body ){
    const result = this.usersService.updateMycourse(currentUsername, body)
    return  result
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  async deleteUser(@Param('id') id: string) {
    const result = await this.usersService.remove(parseInt(id));  
    return result;
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('/profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
