import { FavoritesDto } from 'src/dto/favorites.dto';
import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly favoriteService;
    constructor(favoriteService: FavoritesService);
    getFavorites(limit?: number, offset?: number): Promise<{
        totalFavouriteDeals: number;
        data: any[];
    }>;
    getFavById(id: string, req: any): Promise<any[]>;
    addToFavs(favoritesDto: FavoritesDto, req: any): Promise<(import("../../interface/favorites.interface").Favorites & Required<{
        _id: string;
    }>) | {
        message: string;
    }>;
    removeFromFavourites(postID: string, req: any): Promise<{
        message: string;
    }>;
}
