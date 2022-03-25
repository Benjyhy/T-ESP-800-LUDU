import { Schema, model, Types } from 'mongoose';

//interface
interface Rent {
  game_id: Types.ObjectId;
  user_id: Types.ObjectId;
  start_date: string;
  end_date: string;
  duration: string;
  is_delivered: boolean;
  address: string;
}

//schema
const schema = new Schema<Rent>({
    game_id: {type: Schema.Types.ObjectId,ref: "Game" , required: true },
    user_id: {type: Schema.Types.ObjectId,ref: "User" , required: true },
    start_date: {type: String, required: true },
    end_date: {type: String, required: true },
    duration: {type: String, required: true },
    is_delivered: {type: Boolean, required: true },
    address: {type: String, required: true }
});

//model
const rentModel = model<Rent>('Rent', schema);

export default rentModel;