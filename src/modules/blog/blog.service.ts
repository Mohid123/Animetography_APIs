/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from 'src/interface/blog.interface';
import { Model, Types } from 'mongoose';
import { encodeImageToBlurhash } from 'src/utils/utils';

export enum SORT {
  ASC = 'Ascending',
  DESC = 'Descending',
}
@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>) { }

  async getAllBlogs(offset, limit) {
    try {
      limit = parseInt(limit) < 1 ? 10 : limit;
      offset = parseInt(offset) < 0 ? 0 : offset;
      const totalCount = await this.blogModel.countDocuments({ deletedCheck: false });
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
    if (!blog._id) {
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
      if (result) {
        return result
      }
      else {
        throw new BadRequestException('Failed to create new post!')
      }
    }).catch((err: any) => {
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

  async deletePostPermanently(id: string) {
    return await this.blogModel.deleteOne({ _id: id });
  }

  async searchBlogPost(blogTitle: string) {
    try {
      let sort = {},
          filters = {};

      if (blogTitle) {
        let title = blogTitle == SORT.ASC ? 1 : -1;
        sort = {
          ...sort,
          blogTitle: title,
        };
        if (blogTitle.trim().length) {
          var query = new RegExp(`${blogTitle}`, 'i');
          filters = {
            ...filters,
            blogTitle: query,
          };
        }
        const blogTitles = await this.blogModel.aggregate([
          {
            $match: {
              deletedCheck: false,
              ...filters
            }
          },
          {
            $sort: sort
          },
          {
            $project: { _id: 1, blogTitle: 1 }
          }
        ]);
        return blogTitles
      }
    }
    catch (error) {
      throw new NotFoundException(error)
    }
  }

  async filterByDateRange(dateFrom: any, dateTo: any, limit: any, offset: any) {
    try {
      dateFrom = parseInt(dateFrom);
      dateTo = parseInt(dateTo);
      limit = parseInt(limit) < 1 ? 10 : limit;
      offset = parseInt(offset) < 0 ? 0 : offset;
      let dateFromFilters = {},
          dateToFilters = {},
          matchFilter = {};

      if (dateFrom) {
        dateFromFilters = {
          ...dateFromFilters,
          $gte: dateFrom, // greater than equal to
        };
      }

      if (dateTo) {
        dateToFilters = {
          ...dateToFilters,
          $lte: dateTo, // less than equal to
        };
      }

      if (dateFrom || dateTo) {
        matchFilter = {
          ...matchFilter,
          $and: [
            {
              postedDate: {
                ...dateFromFilters,
              },
            },
            {
              postedDate: {
                ...dateToFilters,
              },
            },
          ],
        };
      }
      const totalCount = await this.blogModel.countDocuments({
        deletedCheck: false,
        ...matchFilter,
      });

      const filteredCount = await this.blogModel.countDocuments({
        deletedCheck: false,
        ...matchFilter,
      });
      const blogPosts = await this.blogModel.aggregate([
        {
          $match: {
            deletedCheck: false,
            ...matchFilter
          }
        },
        {
          $sort: {
            createdAt: -1
          },
        }
      ])
      .skip(parseInt(offset))
      .limit(parseInt(limit));
      return {
        data: blogPosts,
        totalCount: totalCount,
        filteredCount: filteredCount
      }
    }
    catch (error) {
      throw new NotFoundException(error)
    }
  }

  async sortPosts(sortStr: any, offset: any, limit: any) {
    try {
      let queryOrder = sortStr == SORT.ASC ? 1 : -1;
      let sort = {};
      sort = {
        ...sort,
        blogTitle: queryOrder
      };
      const blogPosts = await this.blogModel.aggregate([
        {
          $sort: sort
        }
      ])
      .collation({locale: "en"})
      .skip(parseInt(offset))
      .limit(parseInt(limit));
      return blogPosts;
    }
    catch (error) {
      throw new BadRequestException(error)
    }
  }
}
