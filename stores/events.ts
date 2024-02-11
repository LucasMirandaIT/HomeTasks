import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

interface Event {
  _v: number;
  _id: String;
  title: String;
  start: Date;
  extendedProps: Object;
}

export const useEventsStore = defineStore("calendarevent", () => {
  const events = ref<Event[]>([]);
  const loadingEvents = ref<Boolean>(false);

  async function fetchEvents() {
    try {
      loadingEvents.value = true;
      const response = await axios.get('/api/events');
      events.value = response.data as Event[];
    } catch (error) {
      console.error("Error while fetching Events : ", error);
    } finally {
      loadingEvents.value = false;
    }
  }

  async function addEvent(item: Event) {
    try {
      loadingEvents.value = true;
      
      await useFetch("/api/events", {
        method: "POST",
        body: item,
      });

      fetchEvents();
    } catch (error) {
      loadingEvents.value = false;
      console.error(error);
    } 
  }

  return { events, addEvent, fetchEvents, loadingEvents };
});
