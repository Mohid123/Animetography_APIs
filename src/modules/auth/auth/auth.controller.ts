/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfirmationDto } from 'src/dto/confirmation.dto';
import { LoginDto } from 'src/dto/login.dto';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('login/:email/:password')
    loginToken (
    @Param('email') email: string,
    @Param('password') password: string) {
        if(email == 'test@gmail.com' && password == 'test@123') {
            return this.authService.loginToken();
        }
        else {
            return new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        }
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('signup')
    signup(@Body() signupDto: UserDto) {
        return this.authService.signup(signupDto);
    }

    @Post('confirmEmail')
    async confirmEmail(@Body() confirmationDto: ConfirmationDto) {
        return await this.authService.confirmEmailAdress(confirmationDto);
    }
}
