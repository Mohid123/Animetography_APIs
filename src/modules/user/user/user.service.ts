/* eslint-disable prettier/prettier */
import {ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/interface/user.interface';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user.dto';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async getUserById(id: string): Promise<User> {
        return await this.userModel.findById({_id: id, deletedCheck: false}).then((result) => {
            if(result) {
                return result
            } else {
                throw new NotFoundException('User does not Exist')
            }
        }).catch(() => {
            throw new NotFoundException('User does not Exist')
        })
    }

    async getUsers(limit, offset) {
        try {
            limit = parseInt(limit) < 1 ? 10 : limit;
            offset = parseInt(offset) < 0 ? 0 : offset;
            const totalCount = await this.userModel.countDocuments({deletedCheck: false});
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
            }
        }
        catch {
            throw new NotFoundException('Users Not Found')
        }
    }

    async deleteUser (id: string) {
        return await this.userModel.updateOne({_id: id} , {deletedCheck: true});
    }

    async removeUser(id: string) {
        return await this.userModel.findByIdAndRemove({_id: id});
    }

    async updateUser(userDto: any) {
        debugger
        try {
            return await this.userModel.updateOne({_id: userDto._id}, userDto);
        }
        catch {
            throw new NotFoundException('User Not Found');
        }
    }
}
