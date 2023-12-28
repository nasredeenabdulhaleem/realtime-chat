// import { Socket } from 'socket.io';
// import * as jwt from 'jsonwebtoken';

// export function wsAuthMiddleware(secret: string) {
//     return (socket: Socket, next: Function) => {
//         const token = socket.handshake.query.token;

//         if (!token) {
//             return next(new Error('Authentication error: No token provided'));
//         }

//         try {
//             const payload = jwt.verify(token, secret);
//             socket.client.user = payload.user;
//             next();
//         } catch (err) {
//             if (err instanceof jwt.JsonWebTokenError) {
//                 next(new Error('Authentication error: Invalid token'));
//             } else {
//                 next(new Error('Authentication error: Could not process token'));
//             }
//         }
//     };
// }
