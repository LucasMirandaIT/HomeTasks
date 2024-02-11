import { Room } from "../../models/Room";

export default defineEventHandler(async (event: any) => {
  const rooms = await Room.find();
  // return 'GET';
  return rooms;
});
