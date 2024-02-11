import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

interface Room {
  _v: number;
  _id: String;
  name: String;
  commonArea: Boolean;
  tasks: Array<any>;
}

export const useRoomsStore = defineStore("room", () => {
  const rooms = ref<Room[]>([]);
  const loadingRooms = ref<Boolean>(false);

  async function fetchRooms() {
    try {
      loadingRooms.value = true;

      const { data } = await useFetch("/api/room", {
        method: "GET",
      });
      rooms.value = data.value as Room[];
    } catch (error) {
      console.error("Error while fetching Rooms : ", error);
    } finally {
      loadingRooms.value = false;
    }
  }

  async function addRoom(item: Room) {
    try {
      loadingRooms.value = true;
      
      await useFetch("/api/room", {
        method: "POST",
        body: item,
      });

      fetchRooms();
    } catch (error) {
      loadingRooms.value = false;
      console.error(error);
    } 
  }

  return { rooms, addRoom, fetchRooms, loadingRooms };
});
