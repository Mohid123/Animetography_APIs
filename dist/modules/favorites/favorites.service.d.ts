import { Model } from 'mongoose';
import { Blog } from 'src/interface/blog.interface';
import { Favorites } from 'src/interface/favorites.interface';
export declare class FavoritesService {
    private readonly favModel;
    private readonly blogModel;
    constructor(favModel: Model<Favorites>, blogModel: Model<Blog>);
    addToFavorites(favoritesDto: any, req: any): Promise<(Favorites & Required<{
        _id: string;
    }>) | {
        message: string;
    }>;
    removeFromFavourites(postID: any, req: any): Promise<{
        message: string;
    }>;
    getFavourite(id: string, req: any): Promise<any[]>;
    getAllFavorites(offset: any, limit: any): Promise<{
        totalFavouriteDeals: number;
        data: any[];
    }>;
}
