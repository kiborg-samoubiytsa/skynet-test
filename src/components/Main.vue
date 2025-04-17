<script lang="ts" setup>
import { useWizardStore } from '../stores/wizard'
import { storeToRefs } from 'pinia'
import Controls from './Controls.vue'
const store = useWizardStore()
const { previousStep } = store
const { currentStep, steps, stepsTotal } = storeToRefs(store)
</script>

<template>
  <div class="service-list">
    <div class="service-item" v-for="(step, stepIndex) in stepsTotal">
      <h4 :class="stepIndex == currentStep - 1 ? 'title-active' : 'title'">
        {{ steps[step - 1].title }}
      </h4>
      <div
        class="service-item-body"
        v-for="(variant, variantIndex) in steps[step - 1].variants"
        v-if="step == currentStep"
      >
        <div class="service-item-indicator" :style="{ backgroundColor: variant.color }"></div>
        <div class="service-item-info">
          <div class="service-item-title">{{ variant.title }}</div>
          <div class="service-item-description">
            <!-- сделал немного колхозно, но через line-height меняются также размеры строк, которые не должны быть разделены  -->
            <div v-for="i in variant.description.split('\n')">
              <br />
              {{ i }}
            </div>
          </div>
        </div>
        <Controls :variant="variant" :variant-index="variantIndex"></Controls>
      </div>
      <button
        @click="previousStep"
        class="previous-step-btn"
        v-if="stepIndex > 0 && stepIndex == currentStep - 1"
      >
        Назад
      </button>
    </div>
  </div>
</template>

<style>
.title,
.title-active {
  font-weight: 600;
  font-size: 18px;
  text-align: start;
  margin-top: 10px;
  color: #303030;
}

.title-active {
  opacity: 1;
}

.title {
  opacity: 0.6;
}

.service-list {
  margin: 2rem;
  width: 750px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: none;
}

.service-item-indicator {
  width: 6.5px;
  height: 195px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.service-item-body {
  height: 220px;
  display: flex;
  gap: 12px;
}
.service-item-info {
  width: 500px;
  display: flex;
  flex-direction: column;
}
.service-item-title {
  color: #303030;
  margin-top: 8px;
  font-size: 20px;
  font-weight: 700;
}
.service-item-description {
  line-height: 1.2;
  font-size: 14px;
  border-right: 1px solid #ccc;
  min-height: 150px;
}
.service-item-description span {
  line-height: 1.2;
}

.service-item-controls {
  width: 200px;
  display: flex;
  flex-direction: column;
}
.service-item-controls h4 {
  text-align: end;
  font-weight: 500;
  margin-bottom: 15px;
  color: #555555;
  font-size: 18px;
}
.service-item-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.service-item-control {
  border: 1px #ccc solid;
  border-radius: 5px;
  display: flex;
  height: 35px;
  padding: 8px 8px 8px 8px;
  align-items: center;
}
.service-item-options p {
  font-size: 12px;
  color: #555555;
}
.service-item-control label {
  text-align: center;
  font-size: 14px;
  width: 100%;
}

.service-item-select-confirm,
.service-item-select-confirm-selected,
.default-service-item-select-confirm,
.default-service-item-select-confirm-selected {
  width: 200px;
  height: 35px;
  padding: 8px 8px 8px 8px;
  border-radius: 5px;
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}
.service-item-select-confirm {
  background-color: #98abba;
}
.service-item-select-confirm-selected {
  background-color: #2fcb5a;
}
.service-item-select-confirm:hover {
  background-color: #778691;
}

.default-service-item-select-confirm,
.default-service-item-select-confirm-selected {
  margin-top: 110px;
}
.default-service-item-select-confirm {
  background-color: #98abba;
}
.default-service-item-select-confirm-selected {
  background-color: #2fcb5a;
}

.previous-step-btn {
  width: 100px;
  height: 35px;
  padding: 8px 8px 8px 8px;
  border-radius: 5px;
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;
  background-color: #98abba;
}

.service-item {
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 2px #ccc solid;
}
</style>
