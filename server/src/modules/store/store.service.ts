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

  public async findAll(): Promise<StoreDocument[]> {
    return await this.storeModel.find().populate('location').exec();
  }

  public async findById(id: string): Promise<StoreDocument> {
    return await this.storeModel.findById(id).populate('location').exec();
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

  public async update(
    id: string,
    updateStoreDto: StoreDto,
  ): Promise<StoreDocument> {
    const existingStore = await this.storeModel.findByIdAndUpdate(
      { _id: id },
      updateStoreDto,
    );

    if (!existingStore) throw new NotFoundException(`Store #${id} not found`);

    const location = await this.locationModel.findById(updateStoreDto.location);

    if (!location)
      throw new NotFoundException(`Store ${updateStoreDto.location} not found`);

    return await this.storeModel.findById(id).populate('location').exec();
  }

  public async remove(id: string): Promise<any> {
    const isStore = await this.storeModel.findByIdAndRemove(id);

    if (!isStore) throw new NotFoundException(`Store #${id} not found`);

    return isStore;
  }
}
