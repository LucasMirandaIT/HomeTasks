<template>
  <header>
    <ul>
      <li @click="navigateTo('/')">Página Inicial</li>
      <li @click="navigateTo('/calendar')">Calendário</li>
      <li @click="navigateTo('/settings')">Configurações</li>
    </ul>
  </header>
</template>

<script setup>
const router = useRouter();
const navigateTo = (route) => {
  router.push(route);
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  display: flex;
  gap: 8px;
  li {
    cursor: pointer;
    &:hover {
        font-weight: 700;
        color: blue;
    }
  }
}
</style>
