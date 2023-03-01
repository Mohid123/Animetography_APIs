/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Favorites } from 'src/interface/favorites.interface';
import { generateStringId } from 'src/utils/utils';

export const FavouriteSchema = new mongoose.Schema(
  {
    _id: { type: String, default: generateStringId },
    postID: { type: String, default: '' },
    userID: { type: String, default: '' },
    deletedCheck: { type: Boolean, default: false },
  },
  {
    collection: 'Favorites',
  },
);

FavouriteSchema.set('timestamps', true);
FavouriteSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

mongoose.model('favorites', FavouriteSchema);

FavouriteSchema.pre<Favorites>('save', async function (next) {
  next();
});