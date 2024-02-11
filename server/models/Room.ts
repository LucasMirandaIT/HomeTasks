import {Schema, model} from 'mongoose';

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  commonArea: {
    type: Boolean,
    required: true,
  },
  tasks: {
    type: Array,
    required: true,
  },
});

export const Room = model<any>('Room', RoomSchema)