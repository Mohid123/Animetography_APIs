/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { JwtStrategy } from '../jwt-strategy';
import config from 'src/config';
import { MailModule } from 'src/modules/mail/mail.module';
@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        JwtModule.register({
          secret: config.SECRET_KEY,
          signOptions: { expiresIn: '99999999s'}
        }),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
        MailModule
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy],
      module: AuthModule
    }
  }
}
