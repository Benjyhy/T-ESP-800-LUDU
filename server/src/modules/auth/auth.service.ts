import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  // async validateUser(username: string, pwd: string): Promise<boolean> {
  //   const user = await this.usersService.findById(username);
  //   if (!user) return false;
  //   return user.isPasswordValid(pwd);
  // }
}
