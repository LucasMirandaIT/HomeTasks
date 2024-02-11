<template>
  <section>
    <div>
      Lista de Cômodos
      <button @click="openRoomModal">Adicionar Cômodo</button>
      <p v-if="roomsStore.loadingRooms">Loading...</p>
      <ul class="rooms-list" v-else>
        <li v-for="room in roomsList">
          {{ room.name }}
        </li>
      </ul>
    </div>
    <div>
      Lista de Tarefas
      <button @click="openTaskModal">Adicionar Tarefa</button>
      <ul class="tasks-list">
        <li v-for="task in tasksList">
          {{ task.name }}
        </li>
      </ul>
    </div>
    <div>
      Lista de Usuários
      <button @click="openUserModal">Adicionar Usuário</button>
      <ul class="users-list">
        <li v-for="owner in ownersList">
          <img class="user-picture" :src="owner.picture" />
          {{ owner.name }}
        </li>
      </ul>
    </div>
  </section>

  <BaseModal
    v-if="isOpenedRoomModal"
    :active="isOpenedRoomModal"
    @close="closeModal('room')"
  >
    <AddRoom @close="closeModal('room')" />
  </BaseModal>
  <BaseModal
    v-if="isOpenedTaskModal"
    :active="isOpenedTaskModal"
    @close="closeModal('task')"
  >
    <AddTask />
  </BaseModal>
  <BaseModal
    v-if="isOpenedUserModal"
    :active="isOpenedUserModal"
    @close="closeModal('user')"
  >
    <AddUser />
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoomsStore } from '@/stores/rooms';
import { useTasksStore } from '@/stores/tasks';
import { useUsersStore } from '@/stores/users';

import BaseModal from '@/components/BaseModal.vue';
import { AddTask, AddRoom, AddUser } from '@/components/modals';

const roomsStore = useRoomsStore();
const tasksStore = useTasksStore();
const usersStore = useUsersStore();

const roomsList = computed(() => roomsStore.rooms);
const tasksList = computed(() => tasksStore.tasks);
const ownersList = computed(() => usersStore.users);

const isOpenedRoomModal = ref(false);
const isOpenedTaskModal = ref(false);
const isOpenedUserModal = ref(false);

const openRoomModal = () => {
  isOpenedRoomModal.value = true;
};

const openTaskModal = () => {
  isOpenedTaskModal.value = true;
};

const openUserModal = () => {
  isOpenedUserModal.value = true;
};

const closeModal = (modalType) => {
  modalType === 'room' && (isOpenedRoomModal.value = false);
  modalType === 'task' && (isOpenedTaskModal.value = false);
  modalType === 'user' && (isOpenedUserModal.value = false);
};

onMounted(async () => {
  await roomsStore.fetchRooms();
  await tasksStore.fetchTasks();
  await usersStore.fetchUsers();
});
</script>

<style scoped lang="scss">
.user-picture {
  max-width: 15vw;
  border-radius: 50%;
}

.rooms-list,.tasks-list {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 50%;
  }
}

.users-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  li {
    width: 40%;
  }
}
</style>
