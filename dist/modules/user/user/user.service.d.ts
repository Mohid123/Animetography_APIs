import { User } from 'src/interface/user.interface';
import { Model } from 'mongoose';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    getUserById(id: string): Promise<User>;
    getUsers(offset: any, limit: any): Promise<{
        data: any[];
        totalCount: number;
    }>;
    deleteUser(id: string): Promise<import("mongodb").DeleteResult>;
    removeUser(id: string): Promise<import("mongodb").UpdateResult>;
    updateUser(user: any, userId: string): Promise<{
        message: string;
    }>;
    resetPassword(userDto: any, email: string): Promise<{
        message: string;
    }>;
}
