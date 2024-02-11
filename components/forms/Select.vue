<template>
  <div>
    <label :for="id">{{ label }}</label>
    <select
      :id="id"
      v-model="inputValue"
      v-bind="attrs"
      ref="inputField"
    >
    <slot></slot>
    </select>
  </div>
</template>

<script setup>
import { ref, useAttrs, defineProps, defineEmits } from 'vue';
const attrs = useAttrs();

const props = defineProps({
  id: String,
  label: String,
  name: String,
  valueKey: String,
  labelKey: String,
  width: {
    type: String,
    required: false,
  },
  options: Array,
  placeholder: String,
});

const inputField = ref(null);
const inputValue = ref('');


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
select {
  /* width: 100%; */
  padding: 8px;
  box-sizing: border-box;
}
</style>
