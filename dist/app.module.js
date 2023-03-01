"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const mongoose_1 = require("@nestjs/mongoose");
const app_service_1 = require("./app.service");
const media_upload_module_1 = require("./modules/media-upload/media-upload.module");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth/auth.module");
const config_2 = require("./config");
const user_module_1 = require("./modules/user/user/user.module");
const blog_module_1 = require("./modules/blog/blog.module");
const favorites_module_1 = require("./modules/favorites/favorites.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: 'src/config/development.env',
                isGlobal: true
            }),
            mongoose_1.MongooseModule.forRoot(config_2.default.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }),
            auth_module_1.AuthModule.forRoot(),
            media_upload_module_1.MediaUploadModule,
            blog_module_1.BlogModule,
            user_module_1.UserModule,
            favorites_module_1.FavoritesModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map