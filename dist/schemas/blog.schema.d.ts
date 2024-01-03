import * as mongoose from 'mongoose';
export declare const BlogSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    collection: string;
}>, {
    _id: string;
    deletedCheck: boolean;
    blogTitle: string;
    blogSubtitle: string;
    blogContent: string;
    blogSlug: string;
    coverImage: any[];
    author: string;
    status: string;
    postedDate?: number;
}>;
