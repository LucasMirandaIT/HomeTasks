<template>
  Data selecionada: {{ formatDate(selectedDate) }}
  <AddTask  mode="creatingEvent" :date="selectedDate" @close="handleClose()"/>
</template>

<script setup>
import { defineProps, ref } from "vue";

import AddTask from "@/components/modals/AddTask.vue";

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

const emit = defineEmits(['close']);

const formatDate = (date) => {
  return date?.toLocaleDateString('pt-BR')
};

const handleClose = () => {
  emit('close');
};
</script>

<style scoped></style>
