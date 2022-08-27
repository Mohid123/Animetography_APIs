/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { shareReplay, take } from 'rxjs';
import { BlogDto } from 'src/dto/blog.dto';
import { Blog } from 'src/interface/blog.interface';
import { BlogService } from './blog.service';

@ApiTags('Blogs')
@ApiBearerAuth()
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}
    @Get('getAllBlogs')
    async getAllBlogs(
        @Query('limit') limit = 10,
        @Query('offset') offset = 0
    ) {
        return await this.blogService.getAllBlogs(limit, offset)
    }

    @Get('getBlogByID/:blogID')
    async getBlogById(
        @Param('blogID') blogID: string
    ) {
        return await this.blogService.getBlogByID(blogID);
    }

    @Post('addBlogPost')
    async addBlogPost(@Body() blogDto: BlogDto) {
        const newBlog = await this.blogService.addBlog(blogDto)
        return newBlog
    }

    @Put('updateBlogPost/:blogID')
    async updateBlogPost(@Body() blogDto: BlogDto, @Param('blogID') blogID: string) {
        return await this.blogService.updateBlog(blogDto, blogID)
    }

    @Post('deleteBlogPost/:blogID') 
    async deleteBlogPost(@Param('blogID') blogID: string) {
        return await this.blogService.deleteBlogPost(blogID);
    }
}
