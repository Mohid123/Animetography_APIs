import { BlogDto } from 'src/dto/blog.dto';
import { BlogService } from './blog.service';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    getAllBlogs(limit?: number, offset?: number): Promise<{
        data: any[];
        totalCount: number;
    }>;
    getBlogById(blogID: string): Promise<import("../../interface/blog.interface").Blog & {
        _id: any;
    }>;
    addBlogPost(blogDto: BlogDto): Promise<import("../../interface/blog.interface").Blog & {
        _id: any;
    }>;
    updateBlogPost(blogDto: BlogDto, blogID: string): Promise<{
        message: string;
    }>;
    deleteBlogPost(blogID: string): Promise<import("mongodb").UpdateResult>;
}
