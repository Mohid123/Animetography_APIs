/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResetPasswordDto } from 'src/dto/resetPassword.dto';
import { UserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';
@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('getAllUsers')
    async getAllUsers(
        @Query('limit') limit: number = 10,
        @Query('offset') offset: number = 0
    ) {
        const users = this.userService.getUsers(offset, limit)
        return await users;
    }

    @Get('getUserByID/:userID')
    async getUserByID(
        @Param('userID') userID: string
    ) {
        return await this.userService.getUserById(userID)
    }

    @Put('updateUser/:userId')
    async updateUser(@Body() userDto: UserDto, @Param('userId') userId: string) {
        return await this.userService.updateUser(userDto, userId);
    }

    @Post('deleteUser/:id')
    async deleteUserPermanently(@Param('id') id: string) {
        return await this.userService.removeUser(id);
    }

    @Post('resetPassword/:email')
    async resetUserPassword(@Body() userDto: UserDto, @Param('email') email: string) {
        return await this.userService.resetPassword(userDto, email);
    }
}
