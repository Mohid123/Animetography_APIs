/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Blog, PostStatus } from 'src/interface/blog.interface';

@Injectable()
export class CronjobsService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

  @Cron( CronExpression.EVERY_30_SECONDS )
  async startCronJobForBlogPublish() {
    const currentDateTime = new Date().getTime();
    console.log(currentDateTime)
    const unPublishedPosts = await this.blogModel.find({
        postedDate: { $lte: currentDateTime },
        status: PostStatus.SCHEDULED
    });
    console.log('UNPUBLISHED POSTS: ', unPublishedPosts)
    if (unPublishedPosts.length > 0) {
        for (const post of unPublishedPosts) {
            post.status = PostStatus.PUBLISHED;
            await post.save();
        }
    }
  }
}