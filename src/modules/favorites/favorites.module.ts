import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from 'src/schemas/blog.schema';
import { FavouriteSchema } from 'src/schemas/favorites.schema';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Favorites', schema: FavouriteSchema },
      { name: 'Blog', schema: BlogSchema },
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService]
})
export class FavoritesModule {}
