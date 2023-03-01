/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from 'src/interface/blog.interface';
import { Favorites } from 'src/interface/favorites.interface';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel('Favorites') private readonly favModel: Model<Favorites>,
    @InjectModel('Blog') private readonly blogModel: Model<Blog>,
  ) {}

  async addToFavorites(favoritesDto: any, req: any) {
    try {
      const post = await this.blogModel.findById({
        _id: favoritesDto.postID,
        deletedCheck: false,
      });
      if (!post) {
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      } else {
        const checkIfAlreadyFavorite = await this.favModel.findOne({
          postID: favoritesDto.postID,
          userID: req.user.id,
          deletedCheck: false,
        });
        if (checkIfAlreadyFavorite) {
          return checkIfAlreadyFavorite;
        }
        else {
          favoritesDto.userID = req.user.id;
          await this.favModel.updateOne(
            { postID: favoritesDto.postID, userID: req.user.id },
            { ...favoritesDto, deletedCheck: false },
            { upsert: true },
          );
          return {
            message: 'Added to favourites',
          };
        }
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async removeFromFavourites(postID: any, req: any) {
    try {
      const checkIfExists = await this.favModel.findOne({
        postID: postID,
        userID: req.user.id,
        deletedCheck: false,
      });
      if(checkIfExists) {
        await this.favModel.updateOne({_id: checkIfExists.id, deletedCheck: true});
        return {message: 'Removed from favorites'}
      }
      else {
        throw new HttpException('Post does not exist in favorites', HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async getFavourite(id: string, req: any) {
    try {
      const checkIfExists = await this.favModel.aggregate([
        {
          $match: {
            postID: id,
            userID: req.user.id,
            deletedCheck: false
          }
        },
        {
          $project: {
            __v: 0
          }
        }
      ]);
      if(!checkIfExists) {
        throw new HttpException('Post does not exist in favorites', HttpStatus.NOT_FOUND)
      }
      return checkIfExists;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllFavorites(offset: any, limit: any) {
    try {
      offset = parseInt(offset) < 0 ? 0 : offset;
      limit = parseInt(limit) < 1 ? 10 : limit;

      const totalCount = await this.favModel.countDocuments({
        deletedCheck: false,
      });

      const allFavourites = await this.favModel
        .aggregate([
          {
            $match: {
              deletedCheck: false,
            },
          },
          {
            $sort: {
              cretedAt: -1,
            },
          },
          {
            $project: {
              _id: 0,
            },
          },
        ])
        .skip(parseInt(offset))
        .limit(parseInt(limit));

      return {
        totalFavouriteDeals: totalCount,
        data: allFavourites,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
