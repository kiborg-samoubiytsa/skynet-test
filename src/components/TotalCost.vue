<script lang="ts" setup>
import { useWizardStore } from '@/stores/wizard'
import { storeToRefs } from 'pinia'

const store = useWizardStore()

const { getTotalCost } = storeToRefs(store)
</script>

<template>
  <div class="total-cost-container">
    <div class="total-cost-content">
      <h2>ИТОГО К ОПЛАТЕ</h2>
      <h3>{{ getTotalCost }} ₽</h3>
    </div>
  </div>
</template>

<style scoped>
.total-cost-container {
  border-radius: 3px;
  background-color: #2fcb5a;
  width: 750px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.total-cost-content {
  color: white;
  width: 710px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
h2,
h3 {
  font-size: 28px;
  font-weight: 600;
  margin-top: 0;
}
h3 {
  font-weight: 400;
}
</style>
