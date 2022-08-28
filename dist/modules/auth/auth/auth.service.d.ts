import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
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
            _id: any;
        };
        token: string;
    }>;
    signup(loginDto: any): Promise<User & {
        _id: any;
    }>;
}