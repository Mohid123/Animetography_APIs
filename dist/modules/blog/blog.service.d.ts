import { Blog } from 'src/interface/blog.interface';
import { Model, Types } from 'mongoose';
export declare enum SORT {
    ASC = "Ascending",
    DESC = "Descending"
}
export declare class BlogService {
    private readonly blogModel;
    constructor(blogModel: Model<Blog>);
    getAllBlogs(offset: any, limit: any): Promise<{
        data: any[];
        totalCount: number;
    }>;
    addBlog(blog: any): Promise<Blog & {
        _id: Types.ObjectId;
    }>;
    getBlogByID(id: string): Promise<Blog & {
        _id: Types.ObjectId;
    }>;
    getBlogBySlugName(slug: string): Promise<Blog & {
        _id: Types.ObjectId;
    }>;
    updateBlog(blog: any, blogId: string): Promise<{
        message: string;
    }>;
    deleteBlogPost(id: string): Promise<import("mongodb").UpdateResult>;
    deletePostPermanently(id: string): Promise<import("mongodb").DeleteResult>;
    searchBlogPost(blogTitle: string): Promise<any[]>;
    filterByDateRange(dateFrom: any, dateTo: any, limit: any, offset: any): Promise<{
        data: any[];
        totalCount: number;
        filteredCount: number;
    }>;
    sortPosts(sortStr: any, offset: any, limit: any): Promise<any[]>;
    getUserFavorites(limit: any, offset: any, req: any): Promise<any[]>;
    getUserDrafts(limit: any, offset: any, req: any): Promise<any[]>;
}
