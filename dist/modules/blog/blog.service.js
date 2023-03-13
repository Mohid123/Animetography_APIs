"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = exports.SORT = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const utils_1 = require("../../utils/utils");
var SORT;
(function (SORT) {
    SORT["ASC"] = "Ascending";
    SORT["DESC"] = "Descending";
})(SORT = exports.SORT || (exports.SORT = {}));
let BlogService = class BlogService {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
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
            };
            return returnData;
        }
        catch (_a) {
            throw new common_1.NotFoundException('Blogs not found');
        }
    }
    async addBlog(blog) {
        var e_1, _a;
        if (!blog._id) {
            blog._id = new mongoose_2.Types.ObjectId().toString();
        }
        else {
            const blogItem = await this.blogModel.findById(blog._id);
            if (!blogItem) {
                blogItem._id = blogItem.id;
            }
            else {
                blogItem._id = new mongoose_2.Types.ObjectId().toString();
            }
        }
        const newBlog = new this.blogModel(blog);
        if (newBlog.coverImage && newBlog.coverImage.length) {
            try {
                for (var _b = __asyncValues(newBlog.coverImage), _c; _c = await _b.next(), !_c.done;) {
                    const mediaObj = _c.value;
                    await new Promise(async (resolve, reject) => {
                        try {
                            let mediaUrl = '';
                            mediaUrl = mediaObj.captureFileURL;
                            mediaObj['blurHash'] = await (0, utils_1.encodeImageToBlurhash)(mediaUrl);
                            resolve({});
                        }
                        catch (err) {
                            reject(err);
                        }
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return await newBlog.save().then((result) => {
            if (result) {
                return result;
            }
            else {
                throw new common_1.BadRequestException('Failed to create new post!');
            }
        }).catch((err) => {
            throw new common_1.BadRequestException(err);
        });
    }
    async getBlogByID(id) {
        const oldBlog = await this.blogModel.findOne({ _id: id });
        if (!oldBlog) {
            throw new common_1.NotFoundException('Blog not found');
        }
        else {
            return oldBlog;
        }
    }
    async updateBlog(blog, blogId) {
        var e_2, _a;
        const oldPost = await this.blogModel.findOne({ _id: blogId });
        if (!oldPost) {
            throw new common_1.NotFoundException('Post not found');
        }
        if (blog.coverImage && blog.coverImage.length) {
            blog['captureFileURL'] = blog.coverImage[0].captureFileURL;
            try {
                for (var _b = __asyncValues(blog.coverImage), _c; _c = await _b.next(), !_c.done;) {
                    const mediaObj = _c.value;
                    await new Promise(async (resolve, reject) => {
                        try {
                            let urlMedia = '';
                            urlMedia = mediaObj.captureFileURL;
                            mediaObj['blurHash'] = await (0, utils_1.encodeImageToBlurhash)(urlMedia);
                            resolve({});
                        }
                        catch (err) {
                            reject(err);
                            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.BAD_REQUEST);
                        }
                    });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        await this.blogModel.updateOne({ _id: blogId }, blog);
        return {
            message: 'Blog has been updated succesfully',
        };
    }
    async deleteBlogPost(id) {
        return await this.blogModel.updateOne({ _id: id }, { deletedCheck: true });
    }
    async deletePostPermanently(id) {
        return await this.blogModel.deleteOne({ _id: id });
    }
    async searchBlogPost(blogTitle) {
        try {
            let sort = {}, filters = {};
            if (blogTitle) {
                const title = blogTitle == SORT.ASC ? 1 : -1;
                sort = Object.assign(Object.assign({}, sort), { blogTitle: title });
                if (blogTitle.trim().length) {
                    const query = new RegExp(`${blogTitle}`, 'i');
                    filters = Object.assign(Object.assign({}, filters), { blogTitle: query });
                }
                const blogTitles = await this.blogModel.aggregate([
                    {
                        $match: Object.assign({ deletedCheck: false }, filters)
                    },
                    {
                        $sort: sort
                    },
                    {
                        $project: { _id: 1, blogTitle: 1 }
                    }
                ]);
                return blogTitles;
            }
        }
        catch (error) {
            throw new common_1.NotFoundException(error);
        }
    }
    async filterByDateRange(dateFrom, dateTo, limit, offset) {
        try {
            dateFrom = parseInt(dateFrom);
            dateTo = parseInt(dateTo);
            limit = parseInt(limit) < 1 ? 10 : limit;
            offset = parseInt(offset) < 0 ? 0 : offset;
            let dateFromFilters = {}, dateToFilters = {}, matchFilter = {};
            if (dateFrom) {
                dateFromFilters = Object.assign(Object.assign({}, dateFromFilters), { $gte: dateFrom });
            }
            if (dateTo) {
                dateToFilters = Object.assign(Object.assign({}, dateToFilters), { $lte: dateTo });
            }
            if (dateFrom || dateTo) {
                matchFilter = Object.assign(Object.assign({}, matchFilter), { $and: [
                        {
                            postedDate: Object.assign({}, dateFromFilters),
                        },
                        {
                            postedDate: Object.assign({}, dateToFilters),
                        },
                    ] });
            }
            const totalCount = await this.blogModel.countDocuments(Object.assign({ deletedCheck: false }, matchFilter));
            const filteredCount = await this.blogModel.countDocuments(Object.assign({ deletedCheck: false }, matchFilter));
            const blogPosts = await this.blogModel.aggregate([
                {
                    $match: Object.assign({ deletedCheck: false }, matchFilter)
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
            };
        }
        catch (error) {
            throw new common_1.NotFoundException(error);
        }
    }
    async sortPosts(sortStr, offset, limit) {
        try {
            const queryOrder = sortStr == SORT.ASC ? 1 : -1;
            let sort = {};
            sort = Object.assign(Object.assign({}, sort), { blogTitle: queryOrder });
            const blogPosts = await this.blogModel.aggregate([
                {
                    $sort: sort
                },
                {
                    $match: {
                        deletedCheck: false
                    }
                },
            ])
                .collation({ locale: "en" })
                .skip(parseInt(offset))
                .limit(parseInt(limit));
            return blogPosts;
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async getUserFavorites(limit, offset, req) {
        try {
            offset = parseInt(offset) < 0 ? 0 : offset;
            limit = parseInt(limit) < 1 ? 10 : limit;
            const favoritePosts = await this.blogModel.aggregate([
                {
                    $match: {
                        deletedCheck: false
                    }
                },
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $lookup: {
                        from: 'Favorites',
                        as: 'favoritePost',
                        let: {
                            postID: '$_id',
                            userID: req.user.id,
                            deletedCheck: '$deletedCheck'
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$postID', '$$postID']
                                            },
                                            {
                                                $eq: ['$userID', '$$userID']
                                            },
                                            {
                                                $eq: ['$deletedCheck', false]
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    __v: 0,
                                    updatedAt: 0,
                                    deletedCheck: 0
                                }
                            }
                        ]
                    }
                },
                {
                    $unwind: '$favoritePost'
                },
                {
                    $addFields: {
                        isFavorite: {
                            $cond: [
                                {
                                    $ifNull: ['$favoritePost', false],
                                },
                                true,
                                false,
                            ],
                        },
                    }
                },
                {
                    $project: {
                        _id: 0,
                        _v: 0,
                        __v: 0
                    }
                }
            ])
                .skip(parseInt(offset))
                .limit(parseInt(limit));
            return favoritePosts;
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Blog')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogService);
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map