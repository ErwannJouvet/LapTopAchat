import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtRefreshTokenStrategy } from './jwt.refreshtoken.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtAdminStrategy } from './jwt.admin.strategy';

@Module({
  imports: [UsersModule, PassportModule,
            JwtModule.register({
              secret: jwtConstants.secret,
              signOptions: { expiresIn: '60s' },
            })],
  providers: [AuthService, LocalStrategy, JwtRefreshTokenStrategy, JwtStrategy, JwtAdminStrategy],
  exports: [AuthService]
})
export class AuthModule {}