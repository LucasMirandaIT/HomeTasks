<template>
  <div>
    <label for="roomName">Cômodo</label>
    <Select
      name="roomName"
      v-model="form.room"
      width="50%"
    >
      <option
        :value="room._id"
        v-for="room in roomStore.rooms"
      >
        {{ room.name }}
      </option>
    </Select>
  </div>

  <div>
    <label for="name">Nome da Tarefa</label>

    <Select
      v-if="props.mode === 'creatingEvent'"
      name="name"
      v-model="form.name"
      width="50%"
    >
      <option
        selected
        disabled
        v-if="taskStore.tasksByRoom.length === 0"
      >
        Não foram encontradas tarefas para este cômodo
      </option>
      <option
        :value="task._id"
        v-for="task in taskStore.tasksByRoom"
      >
        {{ task.name }}
      </option>
    </Select>

    <Input
      v-else-if="props.mode === 'addTask'"
      name="roomName"
      v-model="form.name"
      width="50%"
    />
  </div>

  <div>
    <label for="roomName">Descrição da Tarefa</label>
    <Textarea
      v-if="props.mode === 'addTask'"
      name="roomName"
      v-model="form.description"
      width="50%"
    />
    <p v-else>
      {{ form.description }}
    </p>
  </div>

  <div v-if="props.mode === 'creatingEvent'">
    <label for="owner">Responsável</label>
    <Select
      name="owner"
      v-model="form.owner"
      width="50%"
    >
      <option
        :value="owner._id"
        v-for="owner in owners"
      >
        {{ owner.name }}
      </option>
    </Select>
  </div>
  <div v-if="props.mode === 'creatingEvent'">
    <template v-if="form.rules.length > 0">
      <span class="rules-title"
        >Certifique-se que cumpriu todas as regras desta tarefa:</span
      >
      <ul>
        <li v-for="(rule, index) in form.rules">
          {{ rule }}
        </li>
      </ul>
    </template>
  </div>
  <div v-else-if="props.mode === 'addTask'">
    <label for="ruleText">Regras específicas</label>
    <div>
      <Input
      name="ruleText"
      v-model="ruleText"
      width="50%"
    />
      <button @click="addRule">Adicionar</button>
    </div>

    <ul>
      <li v-for="(rule, index) in form.rules">
        {{ rule }}
        <span @click="removeRule(index)">Excluir</span>
      </li>
    </ul>
  </div>

  <div v-if="props.mode === 'creatingEvent'">
    <label for="observations">Observações</label>
    <div>
      <Textarea
        width="50%"
        v-model="form.observations"
      />
    </div>
  </div>

  <Button @click="saveTask">Salvar tarefa</Button>
</template>

<script setup>
import { ref, defineEmits, computed, onMounted, watch } from 'vue';
import { useEventsStore } from '@/stores/events';
import { useRoomsStore } from '@/stores/rooms';
import { useTasksStore } from '@/stores/tasks';
import { useUsersStore } from '@/stores/users';
import { useSnackbarStore } from '@/stores/snackbar';
import { Input, Textarea, Select } from '@/components/forms';
import Button from '@/components/layout/Button.vue';

const eventStore = useEventsStore();
const roomStore = useRoomsStore();
const taskStore = useTasksStore();
const usersStore = useUsersStore();
const snackbar = useSnackbarStore();

const roomsList = computed(() => roomStore.rooms);
const owners = computed(() => usersStore.users);
const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: 'addTask',
  },
  date: {
    type: Date,
    required: false,
  },
});

const emit = defineEmits(['close']);

const form = ref({
  name: '',
  description: '',
  room: '',
  observations: '',
  rules: [],
});
const ruleText = ref('');

const removeRule = (index) => {
  form.value.rules.splice(index, 1);
};

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    room: '',
    observations: '',
    rules: [],
  };
  ruleText.value = '';
};

const addRule = () => {
  const newRule = ruleText.value;
  form.value = { ...form.value, rules: [...form.value.rules, newRule] };
  ruleText.value = '';
};

const saveTask = async () => {
  try {
    if (props.mode === 'creatingEvent') {
      const body = { ...form.value, date: props.date };
      delete body.description;
      delete body.rules;
      const parsedBody = handleBodyToAddEvent(body);
      await eventStore.addEvent(parsedBody);
    } else {
      await taskStore.addTask(form.value);
    }

    emit('close');
    resetForm();
  } catch (error) {
    snackbar.addSnackbar('Erro', 'Uma tarefa com este nome já existe!', {
      timer: 4000,
    });
  }
};

const handleBodyToAddEvent = (body) => {
  const parsedBody = {
    title: `${
      roomsList.value.filter((room) => room._id === body.room)[0].name
    } - ${taskStore.tasks.filter((task) => task._id === body.name)[0].name}`,
    allDay: true,
    start: body.date,
    extendedProps: {
      task: body,
    },
  };
  return parsedBody;
};

watch(
  () => form.value.room,
  () => {
    if (props.mode === 'creatingEvent') {
      form.value = {
        ...form.value,
        name: '',
        description: '',
        rules: [],
      };
    }
    fetchTasksByRoom();
  }
);
watch(
  () => form.value.name,
  () => {
    if (form.value.name && props.mode === 'creatingEvent') {
      const selectedTask = taskStore.tasks.filter(
        (task) => task._id === form.value.name
      )[0];
      form.value.description = selectedTask.description;
      form.value.rules = selectedTask.rules;
    }
  }
);

const fetchTasksByRoom = async () => {
  await taskStore.fetchTasksByRoom(form.value.room);
};

onBeforeMount(async () => {
  await roomStore.fetchRooms();
  await usersStore.fetchUsers();
});
</script>

<style scoped>
label,
.rules-title {
  font-size: 18px;
  font-weight: bold;
}
</style>
