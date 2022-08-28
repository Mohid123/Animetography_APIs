import { Blog } from 'src/interface/blog.interface';
import { Model } from 'mongoose';
export declare class BlogService {
    private readonly blogModel;
    constructor(blogModel: Model<Blog>);
    getAllBlogs(offset: any, limit: any): Promise<{
        data: any[];
        totalCount: number;
    }>;
    addBlog(blog: any): Promise<Blog & {
        _id: any;
    }>;
    getBlogByID(id: string): Promise<Blog & {
        _id: any;
    }>;
    updateBlog(blog: any, blogId: string): Promise<{
        message: string;
    }>;
    deleteBlogPost(id: string): Promise<import("mongodb").UpdateResult>;
}
