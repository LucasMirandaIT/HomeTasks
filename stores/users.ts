import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

interface User {
  _id?: String,
  name: String,
  description: String,
  color: String,
  picture: String
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([]);

  async function fetchUsers() {
    const response = await axios.get('/api/users');
    users.value = response.data as User[];
  }

  async function addUser(item: User) {
    try {
      const { data } = await useFetch("/api/users", {
        method: "POST",
        body: item,
      });

      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }

  return { users, addUser, fetchUsers };
})
