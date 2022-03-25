import { Schema, model } from 'mongoose';

//interface
interface User {
  username: string;
  password: string;
  email: string;
  phone: number;
  avatar?: string;
  description: string;
  address: string;
  jwt: string;
}

//schema
const schema = new Schema<User>({
    username: { type: String, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true},
    phone: { type: Number, required: true},
    avatar: { type: String },
    description: { type: String },
    address: { type: String, required: true},
    jwt: { type: String, required: true},
});

//model
const userModel = model<User>('User', schema);

export default userModel;