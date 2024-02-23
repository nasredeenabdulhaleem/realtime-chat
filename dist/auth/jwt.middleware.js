"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const socket_io_1 = require("socket.io");
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const issuer = process.env.JWT_ISSUER;
const audience = process.env.JWT_AUDIENCE;
let JwtMiddleware = class JwtMiddleware {
    use(req, res, next) {
        let token;
        if (req instanceof socket_io_1.Socket) {
            token = req.handshake.query.token;
        }
        else {
            token = req.headers.authorization?.split(' ')[1];
        }
        if (!token) {
            console.error('No token provided');
            if (res) {
                return res.status(401).json({ message: 'No token provided' });
            }
            else {
                req.disconnect();
            }
        }
        else {
            try {
                const decoded = jwt.verify(token, jwtSecret);
                req.user = decoded;
                console.log('decoded user', req.user);
            }
            catch (err) {
                console.error('JWT verification failed', err);
                if (res) {
                    return res.status(401).json({ message: 'Invalid token' });
                }
                else {
                    req.disconnect();
                }
            }
        }
        next();
    }
};
exports.JwtMiddleware = JwtMiddleware;
exports.JwtMiddleware = JwtMiddleware = __decorate([
    (0, common_1.Injectable)()
], JwtMiddleware);
//# sourceMappingURL=jwt.middleware.js.map