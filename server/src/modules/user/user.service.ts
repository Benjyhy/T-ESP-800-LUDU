import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StoreDocument } from 'src/schemas/store.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { UserDto } from './dto/user.dto';
import { Credentials } from '../../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {}

  public async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  public async findById(id: string): Promise<UserDocument> {
    return await this.userModel.findById(id).exec();
  }

  public async findOne(field: any): Promise<UserDocument> {
    return await this.userModel.findOne(field).exec();
  }

  public async findOnePassword(username: any): Promise<UserDocument> {
    return await this.userModel
      .findOne({ username: username })
      .select('credentials.local.password');
  }

  async create(UserDto: UserDto): Promise<UserDocument> {
    const createdUser = await this.userModel.create(UserDto);
    return await this.userModel.findById(createdUser._id).exec();
  }

  public async update(
    id: string,
    updateUserDto: UserDto,
  ): Promise<UserDocument> {
    const createdUser = await this.userModel.findByIdAndUpdate(
      { _id: id },
      updateUserDto,
    );

    if (!createdUser) throw new NotFoundException(`User #${id} not found`);

    return await this.userModel.findById(id).exec();
  }

  public async remove(id: string): Promise<any> {
    const isUser = await this.userModel.findByIdAndRemove(id);

    if (!isUser) throw new NotFoundException(`User #${id} not found`);

    return isUser;
  }
}
