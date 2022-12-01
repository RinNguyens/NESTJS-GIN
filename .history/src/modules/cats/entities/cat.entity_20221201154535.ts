import { ApiProperty } from '@nestjs/swagger';

export class Cat {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}
