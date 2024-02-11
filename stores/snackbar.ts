import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', () => {
  const activeSnacks = ref<any>([])
  function addSnackbar(title: string, message: string, config: any) {
    const obj = {id: activeSnacks.value.length + 1, title, message};
    activeSnacks.value = [...activeSnacks.value, obj];

    setTimeout(() => {
      findByIdAndRemove(obj.id, activeSnacks.value);
    }, config.timer);
  }

  function findByIdAndRemove(id: number, array: Array<any>) {
    const index = array.findIndex(item => item.id === id);
    
    return (index !== -1) ? array.splice(index, 1) : array;
  }

  function closeSnackbar(id: number) {
    findByIdAndRemove(id, activeSnacks.value);
  };

  return { activeSnacks, addSnackbar, closeSnackbar }
})
