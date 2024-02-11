import { User } from "../../models/User";

export default defineEventHandler(async (event: any) => {
  const users = await User.find();

  return users;
});
