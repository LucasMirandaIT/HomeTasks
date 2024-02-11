import { Events } from "../../models/Events";

export default defineEventHandler(async (event: any) => {
  const events = await Events.find();
  // return 'GET';
  return events;
});
