import * as mongoose from 'mongoose';
export declare const FavouriteSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    _id: string;
    deletedCheck: boolean;
    userID: string;
    postID: string;
}>;
