/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/dto/user.dto';
import { UserService } from './user.service';
@ApiTags('Users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('getAllUsers')
    async getAllUsers(
        @Query('limit') limit = 10,
        @Query('offset') offset = 0
    ) {
        const users = this.userService.getUsers(limit, offset)
        return await users;
    }

    @Put('updateUser')
    async updateUser(@Body() userDto: UserDto) {
        debugger
        return await this.userService.updateUser(userDto);
    }

    @Delete('deleteUser/:id')
    async deleteUserPermanently(@Param('id') id: string) {
        return await this.userService.removeUser(id);
    }
}
