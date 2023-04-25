import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException, Body} from '@nestjs/common';
import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
 
@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy,"jwt-admin") {
  constructor(private usersService:UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('access_token'),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
      passReqToCallback:true
    });
  }
 
  async validate(payload: any) {
    var user = await this.usersService.findOne(payload.username);
    if (!user || user.type.id !== 1) {
        throw new UnauthorizedException();
    }

    const { password, ...result } = user;
    return result;
  }
}