import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class OauthDto {
  @Transform(({ value }) => value.toString())
  @IsNumber()
  id: number;

  @IsString()
  token: string;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
