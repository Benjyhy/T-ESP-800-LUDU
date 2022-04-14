import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../user/dto/user.dto';
import { comparePassword } from 'src/helpers/bcrypt';
import { UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(userDto: UserDto) {
    return { username: userDto.username };
  }

  createToken(payload: any) {
    return this.jwtService.sign(payload, { algorithm: 'RS256' });
  }

  async login(userLogin: LoginDto): Promise<any> {
    const userPassword = await this.userService.findOnePassword(
      userLogin.username,
    );

    if (!userPassword)
      throw new NotFoundException(`User #${userLogin.username} not found`);

    const isCorrectPassword = comparePassword(
      userLogin.password,
      userPassword.credentials.local.password,
    );

    if (!isCorrectPassword) throw new NotFoundException(`Wrong password`);

    const user = await this.userService.findOne({
      username: userLogin.username,
    });

    const token = this.createToken({ id: user._id, username: user.username });

    return { token: token, user: user };
  }

  async register(userDto: UserDto): Promise<UserDocument> {
    return await this.userService.create(userDto);
  }
}
