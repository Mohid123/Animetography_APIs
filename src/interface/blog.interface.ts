/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface Blog extends Document {
    id?: string;
    blogTitle: string;
    blogSubtitle: string;
    blogContent: string;
    postedDate: number;
    coverImage: any[]
    deletedCheck: boolean;
    author: string;
}