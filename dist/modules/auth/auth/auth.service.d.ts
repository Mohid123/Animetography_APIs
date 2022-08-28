import { JwtService } from '@nestjs/jwt';
import { Model, Types } from 'mongoose';
import { User } from 'src/interface/user.interface';
export declare class AuthService {
    private readonly _usersService;
    private jwtService;
    constructor(_usersService: Model<User>, jwtService: JwtService);
    loginToken(): Promise<{
        access_token: string;
    }>;
    private generateToken;
    login(loginDto: any): Promise<{
        user: User & {
            _id: Types.ObjectId;
        };
        token: string;
    }>;
    signup(loginDto: any): Promise<User & {
        _id: Types.ObjectId;
    }>;
}
