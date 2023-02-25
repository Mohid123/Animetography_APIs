/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
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
    @UseGuards(JwtAuthGuard)
    async getAllBlogs(
        @Query('limit') limit: number = 10,
        @Query('offset') offset: number = 0
    ) {
        return await this.blogService.getAllBlogs(offset, limit)
    }

    @Get('getBlogByID/:blogID')
    @UseGuards(JwtAuthGuard)
    async getBlogById(
        @Param('blogID') blogID: string
    ) {
        return await this.blogService.getBlogByID(blogID);
    }

    @Post('addBlogPost')
    @UseGuards(JwtAuthGuard)
    async addBlogPost(@Body() blogDto: BlogDto) {
        const newBlog = await this.blogService.addBlog(blogDto)
        return newBlog
    }

    @Put('updateBlogPost/:blogID')
    @UseGuards(JwtAuthGuard)
    async updateBlogPost(@Body() blogDto: BlogDto, @Param('blogID') blogID: string) {
        return await this.blogService.updateBlog(blogDto, blogID)
    }

    @Post('deleteBlogPost/:blogID')
    @UseGuards(JwtAuthGuard)
    async deleteBlogPost(@Param('postID') postID: string) {
        return await this.blogService.deleteBlogPost(postID);
    }

    @Delete('deletePostPermanently/:id')
    @UseGuards(JwtAuthGuard)
    async deletePermanently(@Param('postID') postID: string) {
        return await this.blogService.deletePostPermanently(postID);
    }
}
