/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const MenuSchema = new mongoose.Schema(
    {
        _id: { type: String, default: '' },
        fullName: { type: String, default: '' },
        email: { type: String, default: '' },
        username: { type: String, default: '' },
        password: { type: String, default: '' },
        images: { type: Array, default: [] },
    },
    {
        collection: 'Auth',
    }
);

MenuSchema.set('timestamps', true);
MenuSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  },
});