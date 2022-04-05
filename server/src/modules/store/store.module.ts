import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from 'src/schemas/store.schema';
import { Location, LocationSchema } from 'src/schemas/location.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Store.name, schema: StoreSchema },
        { name: Location.name, schema: LocationSchema },
      ],
      'mongo',
    ),
  ],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
