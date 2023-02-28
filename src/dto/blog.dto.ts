/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { ApiProperty } from "@nestjs/swagger";

export class BlogDto {
    @ApiProperty()
    _id: string

    @ApiProperty()
    blogTitle: string

    @ApiProperty()
    blogSubtitle: string;

    @ApiProperty()
    blogContent: string;

    @ApiProperty()
    postedDate: number;

    @ApiProperty({
        example:
        [
            {
            captureFileURL: '',
            blurHash:'',
          }
        ]
    })
    coverImage: any[];

    @ApiProperty()
    deletedCheck: boolean;
}