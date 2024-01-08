/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { CronjobsService } from './cronjobs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from "src/schemas/blog.schema";


@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Blog', schema: BlogSchema}
    ])
  ],
  providers: [CronjobsService]
})
export class CronjobsModule {}