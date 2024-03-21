import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cookie } from 'express-session';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string[]) {
    return userRole.includes(roles[0])
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());  

    if (!roles) {
          return true;
        }

    const request = context.switchToHttp().getRequest();    
    return this.matchRoles(roles, request.cookies['access-token'].userRole[0]);
  }
}