<template>
  <section class="snackbar-list">
    <div class="snackbar-container" v-for="snack in snackbar.activeSnacks">
      <span @click="closeSnack(snack.id)">Close Button</span>
      {{ snack.id }}
      {{ snack.title }}
      {{ snack.message }}
    </div>
  </section>
</template>
<script setup>
import {watch} from 'vue';
import { useSnackbarStore } from "@/stores/snackbar";

const snackbar = useSnackbarStore();

const addActiveToAnimate = () => {
  setTimeout(() => {
    const snacks = Array.from(document.getElementsByClassName('snackbar-container'));
    snacks[snacks.length - 1].classList.add('active');
  });
};

const closeSnack = (id) => {
  snackbar.closeSnackbar(id);
}

watch(() => snackbar.activeSnacks, () => {
  addActiveToAnimate();
});
</script>

<style lang="scss" scoped>
.snackbar-list {
  position: fixed;
  top: 16px;
  z-index: 10;
  right: 2px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.snackbar-container {
    /* position: absolute; */
    /* top: 16px; */
    /* right: 0; */
    background: red;
    border-radius: 4px;
    padding: 4px;
    transform: translate(100%, 0px);
    transition: transform .5s;
    &.active {
      transform: translate(0, 0px);
      transition: transform .5s;
    }
}
</style>
