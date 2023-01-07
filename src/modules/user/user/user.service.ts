/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/interface/user.interface';
import { Model } from 'mongoose';
import { encodeImageToBlurhash } from 'src/utils/utils';
import * as bcrypt from 'bcrypt';
import { ResetPasswordDto } from 'src/dto/resetPassword.dto';
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

    async getUsers(offset, limit) {
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
        return await this.userModel.updateOne({ _id: id }, { deletedCheck: true })
    }

    async updateUser(user: any, userId: string) {
        
        const oldUser = await this.userModel.findOne({ id: userId });
        if (!oldUser) {
            
          throw new NotFoundException('User not found');
        }
        
        if (user.avatar && user.avatar.length) {
          
          user['captureFileURL'] = user.avatar[0].captureFileURL;
          
          for await (const mediaObj of user.avatar) {
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
        
        await this.userModel.updateOne({ id: userId }, user);
    
        return {
          message: 'User has been updated succesfully',
        };
    }

    async resetPassword(userDto: any, email: string) {
       try {
        const oldEmail = await this.userModel.findOne({ email: email, deletedCheck: false });
        
        if(oldEmail.email && oldEmail.email !== "") {
            
            const encryptedPassword = await bcrypt.hash(
                userDto.password,
                12,
            );
            
            await this.userModel.findByIdAndUpdate(oldEmail.id, {
                password: encryptedPassword,
            });
            
            return {message: "Password reset successfully"}
        }
        else {
            return { message: "Failed to reset Password"}
        }
       }
       catch (err) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
       }
    }
}
