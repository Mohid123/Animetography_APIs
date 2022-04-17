/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
        _id: { type: String, default: '' },
        fullName: { type: String, default: '' },
        email: { type: String, default: '' },
        username: { type: String, default: '' },
        password: { type: String, default: '' },
        avatar: { type: Array, default: [] },
    },
    {
        collection: 'User',
    }
);

UserSchema.set('timestamps', true);
UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  },
});
