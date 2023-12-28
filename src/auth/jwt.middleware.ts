import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

interface CustomRequest extends Request {
  user?: any;
}

const jwtSecret = process.env.JWT_SECRET;
const issuer = process.env.JWT_ISSUER;
const audience = process.env.JWT_AUDIENCE;

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: CustomRequest, _res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, jwtSecret, {
          issuer: issuer,
          audience: audience,
        });
        req.user = decoded;
      } catch (err) {
        console.error('JWT verification failed', err);
      }
    }
    next();
  }
}
