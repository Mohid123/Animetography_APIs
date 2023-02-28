/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger'

export class FavoritesDto {
    @ApiProperty()
    postID: string;

    @ApiProperty()
    userID: string;

    @ApiProperty()
    deletedCheck: boolean;
}