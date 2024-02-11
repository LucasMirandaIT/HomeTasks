import { Task } from "~/server/models/Task";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  const createdTask = await Task.create(body);

  return createdTask;
});
