/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    _id: string

    @ApiProperty()
    fullName: string

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
}