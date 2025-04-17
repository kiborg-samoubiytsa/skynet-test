<script setup lang="ts">
import Main from './components/Main.vue'
import TotalCost from './components/TotalCost.vue'
</script>

<template>
  <main>
    <Main></Main>
    <TotalCost></TotalCost>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
}
</style>
