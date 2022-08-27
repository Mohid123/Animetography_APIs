/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from 'src/interface/blog.interface';
import { Model, Types } from 'mongoose';
import { encodeImageToBlurhash } from 'src/utils/utils';

@Injectable()
export class BlogService {
    constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) {}

   async getAllBlogs(offset, limit) {
        try {
            limit = parseInt(limit) < 1 ? 10 : limit;
            offset = parseInt(offset) < 0 ? 0 : offset;
            const totalCount = await this.blogModel.countDocuments({deletedCheck: false});
            const getItems = await this.blogModel.aggregate([
                {
                    $match: {
                        deletedCheck: false
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                }
            ])
            .skip(parseInt(offset))
            .limit(parseInt(limit));
            const returnData = {
                data: getItems,
                totalCount: totalCount
            }
            return returnData
        }
        catch {
            throw new NotFoundException('Blogs not found')
        }
    }

    async addBlog(blog: any) {
        if(!blog._id) {
            blog._id = new Types.ObjectId().toString();
        }
        else {
            const blogItem = await this.blogModel.findById(blog._id);
            if (!blogItem) {
                blogItem._id = blogItem.id;
            } else {
                blogItem._id = new Types.ObjectId().toString();
            }
        }
        const newBlog = new this.blogModel(blog);
        if (newBlog.coverImage && newBlog.coverImage.length) {
            for await (const mediaObj of newBlog.coverImage) {
                await new Promise(async (resolve, reject) => {
                    try {
                        let mediaUrl = ''
                        mediaUrl = mediaObj.captureFileURL;
                        mediaObj['blurHash'] = await encodeImageToBlurhash(mediaUrl);
                        resolve({})
                    }
                    catch (err) {
                        reject(err)
                    }
                })
            }
        }
        return await newBlog.save().then((result) => {
            if(result) {
                return result
            }
            else {
                throw new BadRequestException('Failed to Create menu')
            }
        }).catch((err) => {
            throw new BadRequestException(err)
        });
    }

    async getBlogByID(id: string) {
        const oldBlog = await this.blogModel.findOne({ _id: id });

      if (!oldBlog) {
        throw new NotFoundException('Blog not found');
      }
      else {
        return oldBlog
      }
    }

    async updateBlog(blog: any, blogId: string) {
        
        const oldUser = await this.blogModel.findOne({ _id: blogId });
        if (!oldUser) {
            
          throw new NotFoundException('User not found');
        }
        
        if (blog.coverImage && blog.coverImage.length) {
          
          blog['captureFileURL'] = blog.coverImage[0].captureFileURL;
          
          for await (const mediaObj of blog.coverImage) {
            await new Promise(async (resolve, reject) => {
              try {
                let urlMedia = '';
                urlMedia = mediaObj.captureFileURL;
                mediaObj['blurHash'] = await encodeImageToBlurhash(urlMedia);
                
                resolve({});
              } catch (err) {
                console.log('Error', err);
                reject(err);
              }
            });
          }
        }
        
        await this.blogModel.updateOne({ _id: blogId }, blog);
    
        return {
          message: 'Blog has been updated succesfully',
        };
    }

    async deleteBlogPost(id: string) {
        return await this.blogModel.updateOne({ _id: id }, { deletedCheck: true })
    }
}
