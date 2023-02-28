/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/dto/user.dto';
import { JwtAuthGuard } from 'src/modules/auth/auth/jwt-auth.guard';
import { UserService } from './user.service';
@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('getAllUsers')
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    async updateUser(@Body() userDto: UserDto, @Param('userId') userId: string) {
        return await this.userService.updateUser(userDto, userId);
    }

    @Post('deleteUser/:id')
    @UseGuards(JwtAuthGuard)
    async removeUser(@Param('id') id: string) {
        return await this.userService.removeUser(id);
    }

    @Delete('deleteUserPermanently/:id')
    @UseGuards(JwtAuthGuard)
    async deleteUserPermanently(@Param('id') id: string) {
        return await this.userService.deleteUser(id)
    }

    @Post('resetPassword/:email')
    @UseGuards(JwtAuthGuard)
    async resetUserPassword(@Body() userDto: UserDto, @Param('email') email: string) {
        return await this.userService.resetPassword(userDto, email);
    }
}
