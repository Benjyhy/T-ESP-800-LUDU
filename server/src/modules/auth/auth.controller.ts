import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDocument, User } from 'src/schemas/user.schema';
import { UserDto } from '../user/dto/user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/register')
  create(
    @Body(new ValidationPipe({ transform: true }))
    userDto: UserDto,
  ): Promise<UserDocument> {
    return this.authService.register(userDto);
  }

  @Post('/local/login')
  login(
    @Body(new ValidationPipe({ transform: true }))
    userLogin: LoginDto,
  ): Promise<boolean> {
    return this.authService.login(userLogin);
  }
}
