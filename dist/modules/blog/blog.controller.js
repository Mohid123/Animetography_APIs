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
    async getBlogById(blogID) {
        return await this.blogService.getBlogByID(blogID);
    }
    async addBlogPost(blogDto) {
        const newBlog = await this.blogService.addBlog(blogDto);
        return newBlog;
    }
    async updateBlogPost(blogDto, blogID) {
        return await this.blogService.updateBlog(blogDto, blogID);
    }
    async deleteBlogPost(blogID) {
        return await this.blogService.deleteBlogPost(blogID);
    }
};
__decorate([
    (0, common_1.Get)('getAllBlogs'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getAllBlogs", null);
__decorate([
    (0, common_1.Get)('getBlogByID/:blogID'),
    __param(0, (0, common_1.Param)('blogID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getBlogById", null);
__decorate([
    (0, common_1.Post)('addBlogPost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "addBlogPost", null);
__decorate([
    (0, common_1.Put)('updateBlogPost/:blogID'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('blogID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [blog_dto_1.BlogDto, String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "updateBlogPost", null);
__decorate([
    (0, common_1.Post)('deleteBlogPost/:blogID'),
    __param(0, (0, common_1.Param)('blogID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "deleteBlogPost", null);
BlogController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Blogs'),
    (0, common_1.Controller)('blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
exports.BlogController = BlogController;
//# sourceMappingURL=blog.controller.js.map