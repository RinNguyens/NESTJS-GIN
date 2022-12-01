import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  weight: number;
}
