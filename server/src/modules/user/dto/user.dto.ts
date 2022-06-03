import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { ROLES } from 'src/schemas/user.schema';

import { OauthDto } from './oauth.dto';
import { LocalDto } from './local.dto';

interface ICredentials {
  local: LocalDto;
  oauth: OauthDto;
}

export class UserDto {
  @Transform(({ value }) => value.toString())
  _id: string;

  // @ApiProperty({
  //   example: 'Location 1',
  //   description: 'The name of the store',
  // })
  // @IsString()
  // readonly role: [ROLES];

  @ApiProperty({
    example: 'popolito',
    description: 'Your nickname',
  })
  @IsString()
  readonly username: string;

  credentials: ICredentials;

  // @ApiProperty()
  // @IsString()
  // email: string;

  // @ApiProperty()
  // @IsString()
  // password: string;

  // @ApiProperty()
  // @IsString()
  // phone: string;

  // @ApiProperty()
  // @IsString()
  // avatar: string;

  // @ApiProperty()
  // @IsString()
  // description: string;

  // @ApiProperty()
  // @IsString()
  // address: string;
}
