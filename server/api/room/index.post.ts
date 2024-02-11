import { Room } from "../../models/Room";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  const createdRoom = await Room.create(body);

  return createdRoom;
});
