/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
export class URLBody {
  @ApiProperty()
  url: string;
}
