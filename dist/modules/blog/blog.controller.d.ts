/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
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
        _id: import("mongoose").Types.ObjectId;
    }>;
    addBlogPost(blogDto: BlogDto): Promise<import("../../interface/blog.interface").Blog & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateBlogPost(blogDto: BlogDto, blogID: string): Promise<{
        message: string;
    }>;
    deleteBlogPost(blogID: string): Promise<import("mongodb").UpdateResult>;
}
