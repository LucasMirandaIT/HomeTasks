<template>
  <section>
  <section class="lists">
    <div>
      Lista de Cômodos
      <button @click="openRoomModal">Adicionar Cômodo</button>
      <p v-if="roomsStore.loadingRooms">Loading...</p>
      <ul class="rooms-list" v-else>
        <li :class="{active: selectedRoom === room._id}" @click="selectItem(room, 'room')" v-for="room in roomsList">
          {{ room.name }}
        </li>
      </ul>
    </div>
    <div>
      Lista de Tarefas
      <button @click="openTaskModal">Adicionar Tarefa</button>
      <template v-if="selectedRoom">
        <ul class="tasks-list">
          <li @click="selectItem(task, 'task')" v-for="task in tasksList">
            {{ task.name }}
          </li>
        </ul>
      </template>
      <template v-else>
        <p>Selecione um cômodo para ver as tarefas do mesmo</p>
      </template>
    </div>
  </section>
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
const tasksList = computed(() => tasksStore.tasksByRoom);
const ownersList = computed(() => usersStore.users);

const isOpenedRoomModal = ref(false);
const isOpenedTaskModal = ref(false);
const isOpenedUserModal = ref(false);

const selectedRoom = ref();
const selectedTask = ref();

const openRoomModal = () => {
  isOpenedRoomModal.value = true;
};

const openTaskModal = () => {
  isOpenedTaskModal.value = true;
};

const openUserModal = () => {
  isOpenedUserModal.value = true;
};

const selectItem = ({_id}, type) => {
  type === 'room' ? selectedRoom.value = _id : selectedTask.value = _id;
}

const closeModal = (modalType) => {
  console.log('Caiu no Close ::: ', modalType);
  modalType === 'room' && (isOpenedRoomModal.value = false);
  modalType === 'task' && (isOpenedTaskModal.value = false);
  modalType === 'user' && (isOpenedUserModal.value = false);
};

onMounted(async () => {
  await roomsStore.fetchRooms();
  await usersStore.fetchUsers();
});

const fetchTasksByRoom = async (roomId) => {
  await tasksStore.fetchTasksByRoom(roomId);
};

watch(() => selectedRoom.value, () => {
  fetchTasksByRoom(selectedRoom.value);
});
</script>

<style scoped lang="scss">
.user-picture {
  max-width: 15vw;
  border-radius: 50%;
}

.lists {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.rooms-list {
  li {
    cursor: pointer;
  }
  .active {
    color: blue;
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
