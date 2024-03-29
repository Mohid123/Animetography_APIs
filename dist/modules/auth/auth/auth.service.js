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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const utils_1 = require("../../../utils/utils");
const mail_service_1 = require("../../mail/mail.service");
let AuthService = class AuthService {
    constructor(_usersService, jwtService, mailService) {
        this._usersService = _usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async loginToken() {
        const userData = {
            id: '6230c471434e4f306486e31w',
            email: "muhammadmohid141@gmail.com",
            admin: true
        };
        return this.generateToken(userData);
    }
    generateToken(payload) {
        return {
            access_token: `Bearer ${this.jwtService.sign(payload)}`
        };
    }
    async login(loginDto) {
        let user = await this._usersService.findOne({ email: loginDto.email });
        if (!user) {
            throw new common_1.UnauthorizedException('Incorrect Credentials');
        }
        const isValidCredentials = await bcrypt.compare(loginDto.password, user.password);
        if (!isValidCredentials) {
            throw new common_1.UnauthorizedException('Incorrect Credentials');
        }
        user = JSON.parse(JSON.stringify(user));
        delete user.password;
        const token = this.generateToken(user);
        return { user, token: token.access_token };
    }
    async signup(loginDto) {
        var _a, e_1, _b, _c;
        const user = await this._usersService.findOne({ email: loginDto.email });
        if (user) {
            throw new common_1.ForbiddenException('Email already exists');
        }
        loginDto._id = new mongoose_2.Types.ObjectId().toString();
        const newUser = new this._usersService(loginDto);
        if (newUser.avatar && newUser.avatar.length) {
            try {
                for (var _d = true, _e = __asyncValues(newUser.avatar), _f; _f = await _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const mediaObj = _c;
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
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (newUser.isWriter === true) {
            newUser.isWriter = false;
            const token = Math.floor(1000 + Math.random() * 9000).toString();
            await this.mailService.sendUserConfirmation(newUser, token);
        }
        return await new this._usersService(loginDto).save();
    }
    async confirmEmailAdress(id, user) {
        const oldUser = await this._usersService.findOne({ _id: id });
        if (!oldUser) {
            throw new common_1.NotFoundException('User does not exist');
        }
        user.isWriter = true;
        user.isVerified = true;
        await this._usersService.updateOne({ _id: id }, user);
        return { message: 'Your account is now verified. You will now have access to Writer privileges' };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map