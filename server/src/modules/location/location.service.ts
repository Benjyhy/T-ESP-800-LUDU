import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from 'src/schemas/location.schema';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name)
    private locationModel: Model<LocationDocument>,
  ) {}

  findAll(): Promise<LocationDocument[]> {
    return this.locationModel.find().populate('stores').exec();
  }

  findById(id: string): Promise<LocationDocument> {
    return this.locationModel.findById(id).populate('stores').exec();
  }

  create(locationDto: LocationDto): Promise<LocationDocument> {
    return this.locationModel.create(locationDto);
  }
}
