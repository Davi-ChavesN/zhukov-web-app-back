import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract from 'Authorization: Bearer <token>'
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default-secret-key', // Make sure it matches the secret used to sign the token
    });
  }

  async validate(payload: any) {
    return payload; // attach payload to req.user
  }
}
