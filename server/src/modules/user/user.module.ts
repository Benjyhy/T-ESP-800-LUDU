import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Store, StoreSchema } from 'src/schemas/store.schema';

@Module({
  providers: [UserService],
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: User.name,
          useFactory: () => UserSchema,
        },
        {
          name: Store.name,
          useFactory: () => StoreSchema,
        },
      ],
      'mongo',
    ),
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
