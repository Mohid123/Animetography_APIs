import { Model } from 'mongoose';
import { Blog } from 'src/interface/blog.interface';
export declare class CronjobsService {
    private readonly blogModel;
    constructor(blogModel: Model<Blog>);
    startCronJobForBlogPublish(): Promise<void>;
}
