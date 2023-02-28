import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { FavoritesDto } from 'src/dto/favorites.dto';
import { JwtAuthGuard } from '../auth/auth/jwt-auth.guard';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Get('getAllFavorites')
    // @UseGuards(JwtAuthGuard)
    async getFavorites(
      @Query('limit') limit: number = 10,
      @Query('offset') offset: number = 0
    ) {
      return await this.favoriteService.getAllFavorites(offset, limit);
    }

    @Get('getFavoriteByID/:id')
    // @UseGuards(JwtAuthGuard)
    async getFavById(
      @Param('id') id: string
    ) {
      return await this.favoriteService.getFavourite(id);
    }

    @Post('addToFavorites')
    // @UseGuards(JwtAuthGuard)
    async addToFavs(@Body('favoritesDto') favoritesDto: FavoritesDto, @Req() req) {
      return await this.favoriteService.addToFavorites(favoritesDto, req)
    }

    @Get('removeFromFavourites/:id')
    // @UseGuards(JwtAuthGuard)
    removeFromFavourites (
        @Param('id') id: string,
        @Req() req,
    ) {
        return this.favoriteService.removeFromFavourites(id, req)
    }
}
