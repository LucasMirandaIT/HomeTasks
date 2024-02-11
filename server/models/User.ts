import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: false,
  }
});

export const User = model<any>('User', UserSchema)