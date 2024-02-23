import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Socket } from 'socket.io';
interface CustomRequest extends Request {
    user?: any;
}
export declare class JwtMiddleware implements NestMiddleware {
    use(req: CustomRequest | Socket, res: Response, next: NextFunction): Response<any, Record<string, any>>;
}
export {};
