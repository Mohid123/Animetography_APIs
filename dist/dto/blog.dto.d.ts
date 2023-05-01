import { PostStatus } from "src/interface/blog.interface";
export declare class BlogDto {
    _id: string;
    blogTitle: string;
    blogSubtitle: string;
    blogContent: string;
    postedDate: number;
    coverImage: any[];
    deletedCheck: boolean;
    author: string;
    status: PostStatus;
}
