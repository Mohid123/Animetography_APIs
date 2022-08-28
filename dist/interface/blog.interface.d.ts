import { Document } from 'mongoose';
export interface Blog extends Document {
    id?: string;
    blogTitle: string;
    blogSubtitle: string;
    blogContent: string;
    isFavorite: boolean;
    postedDate: number;
    coverImage: any[];
    deletedCheck: boolean;
}
