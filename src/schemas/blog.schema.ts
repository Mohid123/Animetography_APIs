/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { Blog } from 'src/interface/blog.interface';

export const BlogSchema = new mongoose.Schema(
    {
        _id: { type: String, default: '' },
        blogTitle: { type: String, default: '' },
        blogSubtitle: { type: String, default: '' },
        blogContent: { type: String, default: '' },
        postedDate: { type: Number },
        coverImage: { type: Array, default: [] },
        deletedCheck: { type: Boolean, default: false },
        author: { type: String, default: ''},
        status: { type: String, default: ''}
    },
    {
        collection: 'Blog',
    }
);

BlogSchema.set('timestamps', true);
BlogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

mongoose.model('blog', BlogSchema);

BlogSchema.pre<Blog>('save', async function (next) {
  next();
});
