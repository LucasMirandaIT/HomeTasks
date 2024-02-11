<template>
  <div
    id="bottom-sheet"
    class="overlay"
    :class="props.active && 'active'"
  >
    <aside
      class="modal-body"
      role="dialog"
      aria-labelledby="modal-label"
      aria-hidden="true"
    >
      <a
        class="btn-close"
        @click="closeModal()"
        aria-hidden="true"
      ></a>
      <slot />
    </aside>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch } from 'vue';
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

watch(
  () => props.active,
  () => {}
);
</script>

<style scoped lang="scss">
.wrap {
  max-width: 640px;
  margin: 0 auto;
}
.overlay {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  opacity: 0;
  transition: all 450ms cubic-bezier(0.32, 1, 0.23, 1) 0ms;
  z-index: 2;

  .modal-body {
    // position: fixed;
    // bottom: 0;
    width: 100%;
    background-color: #fff;
    padding: 8px 24px 16px;
    box-sizing: border-box;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.22),
      0px 14px 56px rgba(0, 0, 0, 0.25);
    transform: translate(0, 100%);
    transition: all 450ms cubic-bezier(0.32, 1, 0.23, 1) 100ms;
  }

  .btn-close {
    color: #666;
    transform: scale(0, 0);
    transition: all 450ms ease-in-out 0;
  }

  .btn-close {
    position: absolute;
    width: 32px;
    height: 32px;
    opacity: 0.3;
    &:hover {
      opacity: 1;
    }
    &:before,
    &:after {
      position: absolute;
      left: 15px;
      content: ' ';
      height: 33px;
      width: 2px;
      background-color: #333;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }

  &.active {
    // Active animate in modal

    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    opacity: 1;

    .modal-body {
      transform: translate(0, 0);
      z-index: 9;
    }
    .btn-close {
      display: block;
      position: absolute;
      top: 6px;
      right: 10px;
      outline: 0 none;
      transform: scale(1, 1);
    }
  }
}
@media screen and (min-width: 640px) {
  .overlay {
    padding: 0 24px;
    .modal-body {
      width: calc(100% - 48px);
    }
  }
}

@media screen and (max-width: 768px) {
  .overlay {
    .modal-body {
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
