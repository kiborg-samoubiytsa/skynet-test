import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import data from '../data.json'
import type { Data, Option, SelectedItem, Variant } from '@/types'

interface IState {
  currentStep: number
  stepsTotal: number
  totalCost: number
  selectedItems: SelectedItem[]
  steps: Data[]
}

export const useWizardStore = defineStore('wizard', {
  state: (): IState => {
    return {
      currentStep: 1,
      stepsTotal: data.length,
      totalCost: 0,
      selectedItems: [],
      steps: data as any,
    }
  },
  actions: {
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    nextStep() {
      const stepSelections = this.selectedItems[this.currentStep - 1]

      if (stepSelections.isConfirmed && this.currentStep < this.stepsTotal) {
        this.currentStep++
      }
    },
    updateSelectedItem(options: Option[], variant: Variant) {
      const newSelectedItem = {
        variant: variant,
        items: options,
        isConfirmed: false,
      }
      this.selectedItems[this.currentStep - 1] = newSelectedItem
    },
    confirmItemSelect() {
      const stepSelections = this.selectedItems[this.currentStep - 1]

      stepSelections.isConfirmed = true
    },
    resetItemSelect() {
      const newSelectedItem = {
        items: [] as Option[],
        isConfirmed: false,
      }
      this.selectedItems[this.currentStep - 1] = newSelectedItem as SelectedItem
    },
  },
  getters: {
    getTotalCost: (state: IState) => {
      return (state.totalCost = state.selectedItems.reduce((globalAcc, globalPrev) => {
        return (
          globalAcc +
          globalPrev.items.reduce((acc, prev) => {
            return acc + prev.price
          }, 0) +
          (globalPrev.variant ? globalPrev.variant.price_default : 0)
        )
      }, 0))
    },
  },
})
