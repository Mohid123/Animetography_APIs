import { Document } from 'mongoose';
export interface Blog extends Document {
    id?: string;
    blogTitle: string;
    blogSubtitle: string;
    blogContent: string;
    blogSlug: string;
    postedDate: number;
    coverImage: any[];
    deletedCheck: boolean;
    author: string;
    status: PostStatus;
}
export declare enum PostStatus {
    PUBLISHED = "Published",
    DRAFT = "Draft"
}
