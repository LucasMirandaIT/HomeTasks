import {Schema, model} from 'mongoose';

const EventsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  extendedProps: {
    type: Object,
    required: false,
  },
});

export const Events = model<any>('Events', EventsSchema)