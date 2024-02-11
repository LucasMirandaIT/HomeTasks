import { Task } from "../../models/Task";

export default defineEventHandler(async (event: any) => {
  const tasks = await Task.find();

  return tasks;
});
