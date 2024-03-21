import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
){
  constructor(private authService: AuthService){
      super({
         
          jwtFromRequest:ExtractJwt.fromExtractors([(request:Request) => {
              let data = request?.cookies['access-token'];  
            
              if(!data){
                  return null;
              }
              
              return data.refreshToken;
          }]),
          ignoreExpiration: false,
          passReqToCallback:true,
          secretOrKey:'secret',
      })
      
  }

  async validate(req:Request, payload:any){

      if(!payload){
          throw new BadRequestException('invalid jwt token'); 
      }
      
      let data = req?.cookies["access-token"];

     
      if(!data?.refreshToken){
          throw new BadRequestException('invalid refresh token');
      }
    
      let user = await this.authService.refreshTokens(payload.sub, data.refreshToken);  
   

      if(!user){
          throw new BadRequestException('token expired');   
      }
      
      return user;
  }
}
 
