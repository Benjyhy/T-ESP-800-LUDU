import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from 'src/schemas/location.schema';
import { Store, StoreSchema } from 'src/schemas/store.schema';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Location.name, schema: LocationSchema },
        { name: Store.name, schema: StoreSchema },
      ],
      'mongo',
    ),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
