<template>
  Data selecionada: {{ formatDate(selectedDate) }}
  <AddTask  mode="creatingEvent" :date="selectedDate"/>
</template>

<script setup>
import { defineProps, ref } from "vue";

import { useRoomsStore } from "@/stores/rooms";
import { useTasksStore } from "@/stores/tasks";
import { useSnackbarStore } from "@/stores/snackbar";

import AddTask from "@/components/modals/AddTask.vue";

const roomStore = useRoomsStore();
const taskStore = useTasksStore();
const snackbar = useSnackbarStore();

const form = ref({
  room: String,
  task: String,
  owner: String,
});

const props = defineProps({
  selectedDate: {
    type: Date,
  },
});

const formatDate = (date) => {
  return date?.toLocaleDateString('pt-BR')
};
</script>

<style scoped></style>
