import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types, Document } from 'mongoose';
import { Transform } from 'class-transformer';
import { Store } from './store.schema';

export type LocationDocument = Location & Document;

@Schema({ timestamps: true })
export class Location {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: Store.name })
  stores: Store[];
}

export const LocationSchema = SchemaFactory.createForClass(Location);
