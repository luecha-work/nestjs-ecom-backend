import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from 'src/db/entities/Users';
import { UserService } from 'src/modules/user/user.service';
import { JwtPayload } from '../interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, configService: ConfigService) {
    // get token with Bearer
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ignoreExpiration: false,
    //   secretOrKey: configService.get('JWT_SECRET'),
    // });

    // get token with Cookei
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // get token with Cookei
  private static extractJWTFromCookie(req: Request): string | null {
    if (req?.cookies && req?.cookies.access_token) {
      return req?.cookies.access_token;
    }
    return null;
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const user: Users = await this.userService.findOne({ id });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
