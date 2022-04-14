import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Exclude, Transform } from 'class-transformer';
import { IOAuth } from '../modules/user/dto/oauth.dto';
import { ILocal } from '../modules/user/dto/local.dto';
import { ICredentials } from '../modules/user/dto/user.dto';

export enum ROLES {
  OWNER,
  ADMIN,
  USER,
}

export type UserDocument = User & Document;

@Schema()
export class OAuth {
  // @Prop()
  // id: string;

  @Prop()
  token: string;

  @Prop()
  email: string;

  @Prop()
  name: string;
}
export const OAuthSchema = SchemaFactory.createForClass(OAuth);

@Schema()
export class LocalAuth {
  @Prop({ unique: true })
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

  constructor(partial: Partial<LocalAuth>) {
    Object.assign(this, partial);
  }
}
export const LocalSchema = SchemaFactory.createForClass(LocalAuth);

@Schema()
export class Credentials {
  @Prop({ type: LocalAuth })
  local: ILocal;

  @Prop({ type: OAuth })
  oauth: IOAuth;
}
export const CredentialsSchema = SchemaFactory.createForClass(Credentials);

@Schema({ timestamps: true })
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  // @Prop()
  // role: [ROLES];

  @Prop({ unique: true, required: true })
  username: string;

  // Single example
  @Prop({ type: CredentialsSchema })
  credentials: ICredentials;

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
