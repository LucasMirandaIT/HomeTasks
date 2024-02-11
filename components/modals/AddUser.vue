<template>
  <h1>Add User</h1>

  <div>
    <label for="username">Nome do Usuário</label>
    <Input
      name="username"
      v-model="form.name"
    />
  </div>

  <div>
    <label for="description">Descrição</label>
    <Textarea
      name="description"
      v-model="form.description"
      width="50%"
    />
  </div>

  <div>
    <label for="color">Cor do usuário</label>
    <Input
      name="color"
      type="color"
      v-model="form.color"
    />
  </div>
  <div>
    <label for="picture">Foto do usuário</label>
    <Input
      name="picture"
      type="file"
      accept="image/*"
      @change="changeImage"
    />
  </div>

  <button @click="saveRoom">Salvar cômodo</button>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useUsersStore } from '@/stores/users';
import { useSnackbarStore } from '@/stores/snackbar';

import { Input, Textarea } from '@/components/forms';
const { addUser } = useUsersStore();
const snackbar = useSnackbarStore();

const emit = defineEmits(['close']);

const form = ref({
  name: '',
  description: '',
  color: '',
  picture: ''
});

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    color: '',
    picture: ''
  };
};
const changeImage = (event) => {
  const file = event.target.files[0];

  file && convertToBase64(file);
};

const convertToBase64 = (file) => {
      const reader = new FileReader();

      reader.onload = () => {
        form.value.picture = reader.result;
      };

      reader.readAsDataURL(file);
};

const saveRoom = () => {
  try {
    addUser(form.value);

    resetForm();
    emit('close');
  } catch (error) {
    snackbar.addSnackbar('', 'Um usuário com este nome já existe!', {
      timer: 4000,
    });
  }
};
</script>

<style scoped></style>
