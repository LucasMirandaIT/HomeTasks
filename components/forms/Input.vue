
<template>
  <div ref="inputField">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="inputValue"
      v-bind="attrs"
      :type="type"
      :placeholder="placeholder"
      @input="handleInput"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, useAttrs } from 'vue';

const attrs = useAttrs();
const props = defineProps({
  id: String,
  label: String,
  width: {
    type: String,
    required: false
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: String,
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const inputField = ref(null);
const inputValue = ref(props.modelValue);

const handleInput = () => {
  emit('update:modelValue', inputValue.value);
};

onMounted(() => {
    inputField.value.style.width = props.width ?? '100%';
});
</script>

<style scoped>
/* Add your styling here if needed */
div {
  margin-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 4px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
