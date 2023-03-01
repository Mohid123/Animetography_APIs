import { Document } from 'mongoose';
export interface Favorites extends Document {
    _id: string;
    postID: string;
    userID: string;
    deletedCheck: boolean;
}
