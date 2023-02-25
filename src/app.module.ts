/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { MediaUploadModule } from './modules/media-upload/media-upload.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth/auth.module';
import config from './config';
import { UserModule } from './modules/user/user/user.module';
import { BlogModule } from './modules/blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/config/development.env',
      isGlobal: true
  }),
   MongooseModule.forRoot(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }),
   MediaUploadModule,
   BlogModule,
   AuthModule.forRoot(),
   UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
