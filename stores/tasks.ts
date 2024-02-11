import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Task {
  name: String,
  description: String,
  rules: Array<String>,
  room: String, 
}

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);

  async function fetchTasks() {
    const { data } = await useFetch("/api/tasks", {
      method: "GET"
    });
    tasks.value = (data.value) as Task[];
  }

  async function fetchTasksByRoom(roomName: string) {
    const { data } = await useFetch(`/api/tasks/${roomName}`, {
      method: "GET"
    });
    tasks.value = (data.value) as Task[];
  }

  async function addTask(item: Task) {
    try {
      const { data } = await useFetch("/api/task", {
        method: "POST",
        body: item,
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  }

  return { tasks, addTask, fetchTasks, fetchTasksByRoom };
})
