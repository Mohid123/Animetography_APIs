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
exports.CronjobsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const mongoose_2 = require("mongoose");
const blog_interface_1 = require("../../interface/blog.interface");
let CronjobsService = class CronjobsService {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async startCronJobForBlogPublish() {
        const currentDateTime = new Date();
        const unPublishedPosts = await this.blogModel.find({
            postedDate: { $gte: currentDateTime },
            status: blog_interface_1.PostStatus.DRAFT
        });
        console.log('UNPUBLISHED POSTS: ', unPublishedPosts);
        if (unPublishedPosts.length > 0) {
            for (const post of unPublishedPosts) {
                post.status = blog_interface_1.PostStatus.PUBLISHED;
                await post.save();
            }
        }
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_SECONDS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronjobsService.prototype, "startCronJobForBlogPublish", null);
CronjobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Blog')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CronjobsService);
exports.CronjobsService = CronjobsService;
//# sourceMappingURL=cronjobs.service.js.map