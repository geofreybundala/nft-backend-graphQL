import { UsersModule } from './../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule,UsersModule, JwtModule.register({
    signOptions: {expiresIn: '60s'},
    secret: `${process.env.JWT_SECRET}`,
  })],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy]
})
export class AuthModule {
  // constructor(){
  //   console.log(process.env.JWT_SECRET)
  // }
}
