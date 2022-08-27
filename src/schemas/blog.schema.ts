/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { User } from 'src/interface/user.interface';

export const BlogSchema = new mongoose.Schema(
    {
        _id: { type: String, default: '' },
        blogTitle: { type: String, default: '' },
        blogSubtitle: { type: String, default: '' },
        blogContent: { type: String, default: '' },
        isFavorite: { type: Boolean, default: false },
        postedDate: { type: Number },
        coverImage: { type: Array, default: [] },
        deletedCheck: { type: Boolean, default: false }
    },
    {
        collection: 'Blog',
    }
);

BlogSchema.set('timestamps', true);
BlogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  },
});
