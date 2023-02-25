import { HttpException } from '@nestjs/common';
import { LoginDto } from 'src/dto/login.dto';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginToken(email: string, password: string): HttpException | Promise<{
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: import("../../../interface/user.interface").User & {
            _id: import("mongoose").Types.ObjectId;
        };
        token: string;
    }>;
    signup(signupDto: UserDto): Promise<import("../../../interface/user.interface").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
