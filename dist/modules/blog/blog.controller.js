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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const blog_dto_1 = require("../../dto/blog.dto");
const jwt_auth_guard_1 = require("../auth/auth/jwt-auth.guard");
const blog_service_1 = require("./blog.service");
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    async getAllBlogs(limit = 10, offset = 0) {
        return await this.blogService.getAllBlogs(offset, limit);
    }
    async getBlogById(postID) {
        return await this.blogService.getBlogByID(postID);
    }
    async addBlogPost(blogDto) {
        const newBlog = await this.blogService.addBlog(blogDto);
        return newBlog;
    }
    async updateBlogPost(blogDto, postID) {
        return await this.blogService.updateBlog(blogDto, postID);
    }
    async deleteBlogPost(postID) {
        return await this.blogService.deleteBlogPost(postID);
    }
    async deletePermanently(postID) {
        return await this.blogService.deletePostPermanently(postID);
    }
    async searchPostbyTitle(blogTitle) {
        return await this.blogService.searchBlogPost(blogTitle);
    }
    async filterPostsByDateRange(dateFrom, dateTo, limit = 10, offset = 0) {
        return await this.blogService.filterByDateRange(dateFrom, dateTo, limit, offset);
    }
    async sortPostsOrder(sortStr, limit = 10, offset = 0) {
        return await this.blogService.sortPosts(sortStr, offset, limit);
    }
    async getFavoritesForUser(limit = 10, offset = 0, req) {
        return await this.blogService.getUserFavorites(limit, offset, req);
    }
};
__decorate([
    (0, common_1.Get)('getAllBlogs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAllBlogs", null);
__decorate([
    (0, common_1.Get)('getBlogByID/:postID'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('postID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getBlogById", null);
__decorate([
    (0, common_1.Post)('addBlogPost'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "addBlogPost", null);
__decorate([
    (0, common_1.Put)('updateBlogPost/:postID'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('postID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogDto, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "updateBlogPost", null);
__decorate([
    (0, common_1.Post)('deleteBlogPost/:postID'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('postID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deleteBlogPost", null);
__decorate([
    (0, common_1.Delete)('deletePostPermanently/:postID'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('postID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deletePermanently", null);
__decorate([
    (0, common_1.Get)('searchPostByTitle/:blogTitle'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('blogTitle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "searchPostbyTitle", null);
__decorate([
    (0, common_1.Post)('filterPostByDates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('dateFrom')),
    __param(1, (0, common_1.Query)('dateTo')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "filterPostsByDateRange", null);
__decorate([
    (0, common_1.Post)('sortPostsByOrder'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)('sortStr')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "sortPostsOrder", null);
__decorate([
    (0, common_1.Get)('getUserFavorites'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getFavoritesForUser", null);
BlogController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Blogs'),
    (0, common_1.Controller)('blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map