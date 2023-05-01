/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BlogDto } from 'src/dto/blog.dto';
import { JwtAuthGuard } from '../auth/auth/jwt-auth.guard';
import { BlogService } from './blog.service';

// @UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Blogs')
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}
    @Get('getAllBlogs')
    // @UseGuards(JwtAuthGuard)
    async getAllBlogs(
      @Query('limit') limit: number = 10,
      @Query('offset') offset: number = 0
    ) {
      return await this.blogService.getAllBlogs(offset, limit)
    }

    @Get('getBlogByID/:postID')
    // @UseGuards(JwtAuthGuard)
    async getBlogById(
      @Param('postID') postID: string
    ) {
      return await this.blogService.getBlogByID(postID);
    }

    @Post('addBlogPost')
    @UseGuards(JwtAuthGuard)
    async addBlogPost(@Body() blogDto: BlogDto) {
      const newBlog = await this.blogService.addBlog(blogDto)
      return newBlog
    }

    @Put('updateBlogPost/:postID')
    @UseGuards(JwtAuthGuard)
    async updateBlogPost(@Body() blogDto: BlogDto, @Param('postID') postID: string) {
      return await this.blogService.updateBlog(blogDto, postID)
    }

    @Post('deleteBlogPost/:postID')
    @UseGuards(JwtAuthGuard)
    async deleteBlogPost(@Param('postID') postID: string) {
      return await this.blogService.deleteBlogPost(postID);
    }

    @Delete('deletePostPermanently/:postID')
    @UseGuards(JwtAuthGuard)
    async deletePermanently(@Param('postID') postID: string) {
      return await this.blogService.deletePostPermanently(postID);
    }

    @Get('searchPostByTitle/:blogTitle')
    // @UseGuards(JwtAuthGuard)
    async searchPostbyTitle(@Param('blogTitle') blogTitle: string) {
      return await this.blogService.searchBlogPost(blogTitle);
    }

    @Post('filterPostByDates')
    // @UseGuards(JwtAuthGuard)
    async filterPostsByDateRange(
      @Query('dateFrom') dateFrom: number,
      @Query('dateTo') dateTo: number,
      @Query('limit') limit: number = 10,
      @Query('offset') offset: number = 0
      ) {
      return await this.blogService.filterByDateRange(dateFrom, dateTo, limit, offset)
    }

    @Post('sortPostsByOrder')
    // @UseGuards(JwtAuthGuard)
    async sortPostsOrder(
      @Query('sortStr') sortStr: string,
      @Query('limit') limit: number = 10,
      @Query('offset') offset: number = 0
    ) {
      return await this.blogService.sortPosts(sortStr, offset, limit);
    }

    @Get('getUserFavorites')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getFavoritesForUser(
      @Query('limit') limit: number = 10,
      @Query('offset') offset: number = 0,
      @Req() req
    ) {
      return await this.blogService.getUserFavorites(limit, offset, req);
    }

    @Get('getUserDrafts')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getDrafts(
      @Query('limit') limit: number = 10,
      @Query('offset') offset: number = 0,
      @Req() req
    ) {
      return await this.blogService.getUserDrafts(limit, offset, req)
    }
}
