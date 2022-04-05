import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LocationDocument } from 'src/schemas/location.schema';
import { StoreDocument } from 'src/schemas/store.schema';
import { StoreDto } from './dto/store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel('Store')
    private storeModel: Model<StoreDocument>,
    @InjectModel('Location')
    private locationModel: Model<LocationDocument>,
  ) {}

  findAll(): Promise<StoreDocument[]> {
    return this.storeModel.find().populate('location').exec();
  }

  findById(id: string): Promise<StoreDocument> {
    return this.storeModel.findById(id).populate('location').exec();
  }

  async create(storeDto: StoreDto): Promise<StoreDocument> {
    const location = await this.locationModel.findById(storeDto.location);

    if (!location)
      throw new NotFoundException(`Location ${storeDto.location} not found`);

    const createdStore = await this.storeModel.create(storeDto);
    location.stores.push(createdStore);
    await location.save();

    return createdStore;
  }
}
