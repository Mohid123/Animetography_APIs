"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../../schemas/user.schema");
const jwt_strategy_1 = require("../jwt-strategy");
const config_1 = require("../../../config");
const mail_module_1 = require("../../mail/mail.module");
let AuthModule = AuthModule_1 = class AuthModule {
    static forRoot() {
        return {
            imports: [
                jwt_1.JwtModule.register({
                    secret: config_1.default.SECRET_KEY,
                    signOptions: { expiresIn: '99999999s' }
                }),
                mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
                mail_module_1.MailModule
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
            module: AuthModule_1
        };
    }
};
AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Module)({})
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map