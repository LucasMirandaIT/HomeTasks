<template>
  <button class="custom-button" ref="buttonRef">
    <slot></slot>
  </button>
</template>

<script setup>
import { ref } from 'vue';

const buttonRef = ref(null);

const props = defineProps({
  width: {
    type: String,
    required: false
  },
});

onMounted(() => {
    buttonRef.value.style.width = props.width ?? '100%';
});
</script>

<style scoped lang="scss">
.custom-button {
  height: 45px;
  padding: 0 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: #fff; /* Cor do texto */
  background-color: #3498db; /* Cor de fundo normal */
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2980b9; /* Cor de fundo ao passar o mouse */
  }
}
</style>
