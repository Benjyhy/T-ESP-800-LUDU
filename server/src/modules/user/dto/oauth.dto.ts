import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export interface IOAuth {
  id: number;
  token: string;
  email: string;
  name: string;
}

export class IOAuth {
  @Transform(({ value }) => value.toString())
  @IsNumber()
  id: number;

  @IsString()
  token: string;

  @IsString()
  email: string;

  @IsString()
  name: string;
}
