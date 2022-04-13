import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDocument, User } from 'src/schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findById(
    @Param('id')
    id: string,
  ): Promise<UserDocument> {
    return this.userService.findById(id);
  }

  @Post('')
  create(
    @Body(new ValidationPipe({ transform: true }))
    userDto: UserDto,
  ): Promise<UserDocument> {
    return this.userService.create(userDto);
  }

  @Post('/local/login')
  login(
    @Body(new ValidationPipe({ transform: true }))
    userLogin: LoginDto,
  ): Promise<boolean> {
    return this.userService.login(userLogin);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Create a new location' })
  @ApiOkResponse({ description: 'Success', type: User })
  update(
    @Param('id')
    id: string,
    @Body(new ValidationPipe({ transform: true }))
    locationDto: UserDto,
  ): Promise<UserDocument> {
    return this.userService.update(id, locationDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a location' })
  @ApiOkResponse({ description: 'Success', type: User })
  async remove(
    @Param('id')
    id: string,
  ): Promise<void> {
    await this.userService.remove(id);
  }
}
