/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    _id: string

    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName: string

    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty({
        example:
        [
            {
            captureFileURL: '',
            blurHash:'',
          }
        ]
    })
    avatar: any[];

    @ApiProperty()
    deletedCheck: boolean;

    @ApiProperty()
    isAdmin: boolean;

    @ApiProperty()
    isWriter: boolean;

    @ApiProperty()
    isVerified: boolean;
}