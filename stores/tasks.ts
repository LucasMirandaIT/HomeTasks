import { ref } from 'vue'
import { defineStore } from 'pinia'

interface Task {
  name: String,
  description: String,
  rules: Array<String>,
  room: String, 
}

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);
  const tasksByRoom = ref<Task[]>([]);

  async function fetchTasks() {
    const { data } = await useFetch("/api/tasks", {
      method: "GET"
    });
    tasks.value = (data.value) as Task[];
  }

  async function fetchTasksByRoom(roomName: string) {
    tasksByRoom.value = [];
    const { data } = await useFetch(`/api/tasks/${roomName}`, {
      method: "GET"
    });
    tasksByRoom.value = (data.value) as Task[];
  }

  async function addTask(item: Task) {
    try {
      const { data } = await useFetch("/api/tasks", {
        method: "POST",
        body: item,
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  return { tasks, tasksByRoom, addTask, fetchTasks, fetchTasksByRoom };
})
