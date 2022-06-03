import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { hashPassword } from 'src/helpers/bcrypt';

export enum ROLES {
  OWNER,
  ADMIN,
  USER,
}

export type UserDocument = User & Document;

export class Oauth {
  @Prop()
  token: string;

  @Prop()
  email: string;

  @Prop()
  name: string;
}

export class LocalAuth {
  @Prop()
  email: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    select: false,
  })
  @Exclude()
  password: string;

  @Prop()
  emailVerified: string;
}

export class Credentials {
  @Prop({ type: LocalAuth })
  local: LocalAuth;

  @Prop({ type: Oauth })
  oauth: Oauth;
}

@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ type: Credentials })
  credentials: Credentials;

  // @Prop()
  // role: [ROLES];

  // @Prop({ required: true })
  // phone: number;

  // @Prop()
  // avatar: string;

  // @Prop()
  // description: string;

  // @Prop()
  // address: string;

  // @Prop({ type: Types.ObjectId, ref: 'Store' })
  // store: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.credentials.local.password) {
    this.credentials.local.password = hashPassword(
      this.credentials.local.password,
    );
  }
  next();
});
