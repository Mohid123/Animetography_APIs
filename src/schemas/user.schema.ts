/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { User } from 'src/interface/user.interface';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
    {
        _id: { type: String, default: '' },
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' },
        email: { type: String, default: '' },
        username: { type: String, default: '' },
        password: { type: String, default: '' },
        avatar: { type: Array, default: [] },
        deletedCheck: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false },
        isWriter: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false }
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

UserSchema.pre<User>('save',async function(next){
  const salt=await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  this.email = this.email.toLowerCase();

  next();
});
