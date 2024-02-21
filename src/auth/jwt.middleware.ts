/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';
// import * as dotenv from 'dotenv';

// dotenv.config();

// interface CustomRequest extends Request {
//   user?: any;
// }

// const jwtSecret = process.env.JWT_SECRET;
// const issuer = process.env.JWT_ISSUER;
// const audience = process.env.JWT_AUDIENCE;

// @Injectable()
// export class JwtMiddleware implements NestMiddleware {
//   use(req: CustomRequest, res: Response, next: NextFunction) {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (token) {
//       try {
//         const decoded = jwt.verify(token, jwtSecret, {
//           issuer: issuer,
//           audience: audience,
//         });
//         req.user = decoded;
//       } catch (err) {
//         console.error('JWT verification failed', err);
//         return res.status(401).json({ message: 'Invalid token' });
//       }
//     }
//     next();
//   }
// }

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Socket } from 'socket.io';

dotenv.config();

interface CustomRequest extends Request {
  user?: any;
}

const jwtSecret = process.env.JWT_SECRET;
const issuer = process.env.JWT_ISSUER;
const audience = process.env.JWT_AUDIENCE;

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: CustomRequest | Socket, res: Response, next: NextFunction) {
    let token: string | undefined;

    if (req instanceof Socket) {
      // WebSocket connection
      token = req.handshake.query.token as string;
    } else {
      // HTTP request
      token = req.headers.authorization?.split(' ')[1] as string;
    }

    if (!token) {
      console.error('No token provided');
      if (res) {
        return res.status(401).json({ message: 'No token provided' });
      } else {
        (req as Socket).disconnect();
      }
    } else {
      try {
        const decoded = jwt.verify(token, jwtSecret);
        // console.log(decoded);
        (req as CustomRequest).user = decoded;
        console.log('decoded user', (req as CustomRequest).user);
        // return req;
      } catch (err) {
        console.error('JWT verification failed', err);
        if (res) {
          return res.status(401).json({ message: 'Invalid token' });
        } else {
          (req as Socket).disconnect();
        }
      }
    }
    next();
  }
}
