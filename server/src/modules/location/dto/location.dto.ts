import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { StoreDocument } from 'src/schemas/store.schema';

export class LocationDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  @ApiProperty({
    example: 'Location 1',
    description: 'The name of the location',
  })
  readonly name: string;

  @ApiPropertyOptional({ description: 'Stores' })
  readonly stores: StoreDocument[];
}
