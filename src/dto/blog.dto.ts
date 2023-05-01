/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { ApiProperty } from "@nestjs/swagger";
import { PostStatus } from "src/interface/blog.interface";

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

    @ApiProperty()
    author: string;

    @ApiProperty()
    status: PostStatus
}