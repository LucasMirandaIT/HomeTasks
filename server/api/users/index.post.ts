import { User } from "~/server/models/User";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  const createdUser = await User.create(body);

  return createdUser;
});
