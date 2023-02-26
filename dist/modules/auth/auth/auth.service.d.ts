import { JwtService } from '@nestjs/jwt';
import { Model, Types } from 'mongoose';
import { User } from 'src/interface/user.interface';
import { MailService } from 'src/modules/mail/mail.service';
export declare class AuthService {
    private readonly _usersService;
    private jwtService;
    private mailService;
    constructor(_usersService: Model<User>, jwtService: JwtService, mailService: MailService);
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
    confirmEmailAdress(confirmationDto: any): Promise<{
        message: string;
    }>;
}
