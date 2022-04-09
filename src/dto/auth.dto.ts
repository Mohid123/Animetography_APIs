/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { ApiProperty } from "@nestjs/swagger";

export class MenuDto {
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
    images: any[];
}