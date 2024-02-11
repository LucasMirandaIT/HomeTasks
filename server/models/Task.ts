import {Schema, model} from 'mongoose';

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  rules: {
    type: Array<string>,
    required: false,
  },
  room: {
    type: String,
    required: false,
  },
});

export const Task = model<any>('Task', TaskSchema)