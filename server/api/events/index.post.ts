import { Events } from "../../models/Events";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  const createdEvent = await Events.create(body);

  return createdEvent;
});
