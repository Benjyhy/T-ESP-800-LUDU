import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class StoreDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'Location 1',
    description: 'The name of the store',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: '75 rue de test',
    description: 'The address of the store',
  })
  @IsString()
  readonly address: string;

  @ApiProperty()
  @IsString()
  owner: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  location: string;
}
