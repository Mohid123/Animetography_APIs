import * as mongoose from 'mongoose';
export declare const BlogSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    _id: string;
    deletedCheck: boolean;
    blogTitle: string;
    blogSubtitle: string;
    blogContent: string;
    isFavorite: boolean;
    coverImage: any[];
    postedDate?: number;
}>;
