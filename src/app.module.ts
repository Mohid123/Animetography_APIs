/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { FavoritesModule } from './modules/favorites/favorites.module';
import { CronjobsModule } from './modules/cronjobs/cronjobs.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'src/config/development.env',
      isGlobal: true
  }),
   MongooseModule.forRoot(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }),
   AuthModule.forRoot(),
   ScheduleModule.forRoot(),
   MediaUploadModule,
   BlogModule,
   UserModule,
   FavoritesModule,
   CronjobsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
