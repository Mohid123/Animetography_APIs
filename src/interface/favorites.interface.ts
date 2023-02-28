/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Favorites extends Document {
    id?: string;
    postID: string;
    userID: string;
    deletedCheck: boolean;
}