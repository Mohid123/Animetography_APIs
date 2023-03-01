/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FavoritesDto } from 'src/dto/favorites.dto';
import { JwtAuthGuard } from '../auth/auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';

@ApiTags('Favorites')
@Controller('favorites')
@ApiBearerAuth()
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Get('getAllFavorites')
    @UseGuards(JwtAuthGuard)
    async getFavorites(
      @Query('limit') limit: number = 10,
      @Query('offset') offset: number = 0
    ) {
      return await this.favoriteService.getAllFavorites(offset, limit);
    }

    @Get('getFavoriteByID/:id')
    @UseGuards(JwtAuthGuard)
    async getFavById(
      @Param('id') id: string,
      @Req() req
    ) {
      return await this.favoriteService.getFavourite(id, req);
    }

    @Post('addToFavorites')
    @UseGuards(JwtAuthGuard)
    async addToFavs(@Body() favoritesDto: FavoritesDto, @Req() req) {
      return await this.favoriteService.addToFavorites(favoritesDto, req)
    }

    @Get('removeFromFavourites/:postID')
    @UseGuards(JwtAuthGuard)
    removeFromFavourites (
        @Param('postID') postID: string,
        @Req() req,
    ) {
      return this.favoriteService.removeFromFavourites(postID, req)
    }
}
