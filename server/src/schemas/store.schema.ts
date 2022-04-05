import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Transform } from 'class-transformer';
import { Location } from './location.schema';

export type StoreDocument = Store & Document;

@Schema({ timestamps: true })
export class Store {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop({ unique: true })
  address: string;

  @Prop()
  owner: string;

  @Prop()
  phone: string;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  location: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
