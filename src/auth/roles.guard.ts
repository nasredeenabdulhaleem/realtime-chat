// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.get<string[]>(
//       'roles',
//       context.getHandler(),
//     );
//     if (!requiredRoles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     return requiredRoles.some((role) => user?.roles?.includes(role));
//   }
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Socket } from 'socket.io';

interface UserSocket extends Socket {
  user?: any;
}
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    let user;
    const httpContext = context.switchToHttp().getRequest();
    // const wsContext = context.switchToWs().getClient<Socket>();
    const wsContext = context.switchToWs().getClient<UserSocket>();

    if (httpContext) {
      user = httpContext.user;
    } else if (wsContext) {
      user = wsContext.user;
    }

    return requiredRoles.some((role) => user?.roles?.includes(role));
  }
}
