<template>
  <h1>Add Room</h1>

  <div>
    <label for="roomName">Nome do Cômodo</label>
    <Input
      name="roomName"
      v-model="form.name"
      :width="isMobile ? '100%' : '50%'"
    />
  </div>

  <div>
    <label for="commonArea">Área comum?</label>

    <Input
      type="checkbox"
      name="commonArea"
      v-model="form.commonArea"
      :width="isMobile ? '100%' : '50%'"
    />
  </div>

  <Button :width="isMobile ? '100%' : '50%'" :onclick="saveRoom">Salvar cômodo</Button>
</template>

<script setup>
import { ref, defineEmits, watch } from "vue";
import { useRoomsStore } from "@/stores/rooms";
import { useSnackbarStore } from "@/stores/snackbar";
import Input from '@/components/forms/Input.vue';
import Button from "../layout/Button.vue";

const { addRoom } = useRoomsStore();
const snackbar = useSnackbarStore();

const isMobile = computed(() => window.innerWidth < 768);

const emit = defineEmits(["close"]);

const form = ref({
  name: "",
  commonArea: false,
  tasks: [],
});

const updateInput = (event, fieldName) => {
    form.value[fieldName] = event.target.value;
};

const resetForm = () => {
  form.value = {
    name: "",
    commonArea: false,
    tasks: [],
  };
};

const saveRoom = () => {
    try {
        addRoom(form.value);

        resetForm();
        emit("close");
    } catch (error) {
        snackbar.addSnackbar('', 'Um cômodo com este nome já existe!', {timer: 4000});
    }
};

</script>

<style scoped></style>
