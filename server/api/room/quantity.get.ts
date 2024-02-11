import { Room } from "../../models/Room";

export default defineEventHandler(async (event: any) => {
  const rooms = await Room.countDocuments();
  // return 'GET';
  return rooms;
});
