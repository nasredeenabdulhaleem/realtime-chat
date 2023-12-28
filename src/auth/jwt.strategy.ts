import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const issuer = process.env.JWT_ISSUER;
const audience = process.env.JWT_AUDIENCE;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: any) {
    // Check if payload exists
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    // Check if token has expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (payload.exp < currentTimestamp) {
      throw new UnauthorizedException('Token has expired');
    }

    // Check if token has a valid issuer
    const validIssuer = issuer;
    if (payload.iss !== validIssuer) {
      throw new UnauthorizedException('Invalid token issuer');
    }

    // Check if token has a valid audience
    const validAudience = audience;
    if (payload.aud !== validAudience) {
      throw new UnauthorizedException('Invalid token audience');
    }

    // Check if token has a valid subject
    const validSubject = 'your-subject';
    if (payload.sub !== validSubject) {
      throw new UnauthorizedException('Invalid token subject');
    }

    return payload;
  }
}
