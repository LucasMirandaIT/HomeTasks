import { Task } from "../../models/Task";

export default defineEventHandler(async (event) => {
    // event.context.params.slug to get the route segment: 'bar/baz'
    const routeRoom = event.context.params.slug;
    const tasks = await Task.find({room: routeRoom});

    return tasks;
  })