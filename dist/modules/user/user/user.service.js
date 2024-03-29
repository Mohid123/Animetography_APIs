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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const utils_1 = require("../../../utils/utils");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUserById(id) {
        return await this.userModel.findById({ _id: id, deletedCheck: false }).then((result) => {
            if (result) {
                return result;
            }
            else {
                throw new common_1.NotFoundException('User does not Exist');
            }
        }).catch(() => {
            throw new common_1.NotFoundException('User does not Exist');
        });
    }
    async getUsers(offset, limit) {
        try {
            limit = parseInt(limit) < 1 ? 10 : limit;
            offset = parseInt(offset) < 0 ? 0 : offset;
            const totalCount = await this.userModel.countDocuments({ deletedCheck: false });
            const getItems = await this.userModel.aggregate([
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
            return {
                data: getItems,
                totalCount: totalCount
            };
        }
        catch (_a) {
            throw new common_1.NotFoundException('Users Not Found');
        }
    }
    async deleteUser(id) {
        return await this.userModel.deleteOne({ _id: id });
    }
    async removeUser(id) {
        return await this.userModel.updateOne({ _id: id }, { deletedCheck: true });
    }
    async updateUser(user, userId) {
        var _a, e_1, _b, _c;
        const oldUser = await this.userModel.findOne({ _id: userId });
        if (!oldUser) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.avatar && user.avatar.length) {
            user['captureFileURL'] = user.avatar[0].captureFileURL;
            try {
                for (var _d = true, _e = __asyncValues(user.avatar), _f; _f = await _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const mediaObj = _c;
                        await new Promise(async (resolve, reject) => {
                            try {
                                let urlMedia = '';
                                urlMedia = mediaObj.captureFileURL;
                                mediaObj['blurHash'] = await (0, utils_1.encodeImageToBlurhash)(urlMedia);
                                resolve({});
                            }
                            catch (err) {
                                console.log('Error', err);
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
        await this.userModel.updateOne({ _id: userId }, user);
        return {
            message: 'User has been updated succesfully',
        };
    }
    async resetPassword(userDto, email) {
        try {
            const oldEmail = await this.userModel.findOne({ email: email, deletedCheck: false });
            if (!oldEmail || oldEmail == null) {
                return { message: "Email does not exist" };
            }
            else {
                if (oldEmail.email && oldEmail.email !== "") {
                    const encryptedPassword = await bcrypt.hash(userDto.password, 12);
                    await this.userModel.findByIdAndUpdate(oldEmail.id, {
                        password: encryptedPassword,
                    });
                    return { message: "Password reset successfully" };
                }
                else {
                    return { message: "Failed to reset Password" };
                }
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map