
<template>
  <div>
    <label :for="id">{{ label }}</label>
    <textarea
    :id="id"
      v-model="textareaValue"
      v-bind="attrs"
      :placeholder="placeholder"
      ref="textareaField"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, useAttrs } from 'vue';
const attrs = useAttrs();
const props = defineProps({
  id: String,
  label: String,
  width: {
    type: String,
    required: false
  },
  placeholder: String,
  value: String,
});

const textareaField = ref(null);
const textareaValue = ref('');


onMounted(() => {
  textareaField.value.style.width = props.width ?? '100%';
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
textarea {
  /* width: 100%; */
  padding: 8px;
  box-sizing: border-box;
}
</style>
