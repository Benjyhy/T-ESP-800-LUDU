import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Store, StoreSchema } from 'src/schemas/store.schema';
import { hashPassword } from 'src/helpers/bcrypt';
import { UserDto } from './dto/user.dto';

@Module({
  providers: [UserService],
  imports: [
    MongooseModule.forFeatureAsync(
      [
        {
          name: User.name,
          useFactory: () => {
            const schema = UserSchema;

            schema.pre<UserDto>('save', async function (next) {
              // eslint-disable-next-line @typescript-eslint/no-this-alias
              const user = this;
              try {
                const hashedPassword = await hashPassword(
                  user.credentials.local.password,
                );
                user.credentials.local.password = hashedPassword;
                return next();
              } catch (error) {
                return next(error);
              }
            });
            return schema;
          },
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
