/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BlogDto } from 'src/dto/blog.dto';
import { JwtAuthGuard } from '../auth/auth/jwt-auth.guard';
import { BlogService } from './blog.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Blogs')
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}
    @Get('getAllBlogs')
    async getAllBlogs(
        @Query('limit') limit: number = 10,
        @Query('offset') offset: number = 0
    ) {
        return await this.blogService.getAllBlogs(offset, limit)
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
