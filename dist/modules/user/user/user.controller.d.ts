import { UserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(limit?: number, offset?: number): Promise<{
        data: any[];
        totalCount: number;
    }>;
    getUserByID(userID: string): Promise<import("../../../interface/user.interface").User>;
    updateUser(userDto: UserDto, userId: string): Promise<{
        message: string;
    }>;
    removeUser(id: string): Promise<import("mongodb").UpdateResult>;
    deleteUserPermanently(id: string): Promise<import("mongodb").DeleteResult>;
    resetUserPassword(userDto: UserDto, email: string): Promise<{
        message: string;
    }>;
}
