import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaUploadModule } from './modules/file-management/media-upload/media-upload/media-upload.module';

@Module({
  imports: [MediaUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
