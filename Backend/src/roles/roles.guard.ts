// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class RolesGuard implements CanActivate {
//     constructor(
//     private readonly jwtService: JwtService,
//     private readonly reflector: Reflector 
//     ) {}

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//     console.log('RolesGuard!');

//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers.authorization;
//     console.log('Headers:', request.headers);

//     if (!authHeader) {
//         throw new UnauthorizedException('Authorization header faltando');
//     }

//     const [type, token] = authHeader.split(' ');
//     console.log('Token:', token);

//     if (type !== 'Bearer' || !token) {
//         throw new UnauthorizedException('Formato de token invalido');
//     }

//     try {
//         const payload = await this.jwtService.verifyAsync(token);
//         console.log('Payload:', payload);
//         request.user = payload; // Attach user payload to the request object

        
//       // Retrieve required roles from metadata
//         const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

//       // If no roles are specified, allow access by default
//         if (!requiredRoles) {
//         return true;
//         }

//       // Check if the user has at least one required role
//       const userRoles = payload.roles; // Ensure roles are part of the JWT payload
//         if (!requiredRoles.some(role => userRoles.includes(role))) {
//         throw new UnauthorizedException('Acesso negado: permissões insuficientes');
//         }
//         return true;
//     } catch (error) {
//         console.log("Token Error: ", error.message)
//         throw new UnauthorizedException('Token invalido ou expirado');
//     }
//     }
// }