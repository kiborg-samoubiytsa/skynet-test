<script lang="ts" setup>
import { useWizardStore } from '@/stores/wizard'
import type { Option, Variant } from '@/types'
import { storeToRefs } from 'pinia'
import { ref, type Ref } from 'vue'

interface Props {
  variant: Variant
  variantIndex: number
}
const props = defineProps<Props>()

const store = useWizardStore()
const {
  currentStep,
  steps,
  stepsTotal,
  getTotalCost,
  selectedItems: _selectedItems,
} = storeToRefs(store)

const { nextStep, updateSelectedItem, confirmItemSelect, resetItemSelect } = store

const selectedItems = ref<{ variant: Variant; items: Option[]; isConfirmed: boolean }>(
  _selectedItems.value[currentStep.value - 1]?.variant?.title == props.variant.title
    ? _selectedItems.value[currentStep.value - 1]
    : { variant: props.variant, items: [], isConfirmed: false },
)

const handleCheckboxChange = (option: Option) => {
  const index = selectedItems.value.items.findIndex((i) => i.title === option.title)
  if (index === -1) {
    selectedItems.value.items.push(option)
  } else {
    selectedItems.value.items.splice(index, 1)
  }
}

const handleSelectChange = (event: Event, selectIndex: number) => {
  const option = JSON.parse((event.target as HTMLInputElement)?.value)

  selectedItems.value.items[selectIndex] = option
}

const handleItemsConfirm = (e: Event) => {
  e.preventDefault()
  if (
    selectedItems.value.isConfirmed &&
    _selectedItems.value[currentStep.value - 1]?.variant?.title == props.variant.title
  ) {
    resetItemSelect()
  } else {
    updateSelectedItem(selectedItems.value.items, props.variant)
    confirmItemSelect()
  }
  nextStep()
}
</script>

<template>
  <form class="service-item-controls" @submit="(e) => handleItemsConfirm(e)" action="">
    <h4>
      {{
        variant.price_default +
        selectedItems.items.reduce((acc, prev) => {
          return acc + prev.price
        }, 0)
      }}
      ₽
    </h4>
    <div class="service-item-wrapper" v-if="variant.options.length > 0">
      <div class="service-item-options">
        <div class="service-item-control" v-for="(option, i) in variant.options">
          <input
            type="checkbox"
            :id="i.toString()"
            @change="handleCheckboxChange(option)"
            :disabled="
              selectedItems.isConfirmed &&
              _selectedItems[currentStep - 1]?.variant?.title == props.variant.title
            "
            :checked="selectedItems.items.some((e) => e.title == option.title)"
          />
          <label :for="i.toString()">{{ option.title }}</label>
        </div>
      </div>
      <button
        @click=""
        :class="
          _selectedItems[variantIndex]?.isConfirmed &&
          variant.title == _selectedItems[variantIndex]?.variant?.title
            ? 'service-item-select-confirm-selected'
            : 'service-item-select-confirm'
        "
      >
        {{
          _selectedItems[variantIndex]?.isConfirmed &&
          variant.title == _selectedItems[variantIndex]?.variant?.title
            ? 'Выбрано'
            : 'Выбрать'
        }}
      </button>
    </div>
    <div class="service-item-wrapper" v-if="variant.select.length > 0">
      <div class="service-item-options" v-for="(select, selectIndex) in variant.select">
        <p>{{ select.title }}</p>
        <select
          :key="selectIndex"
          @change="handleSelectChange($event, selectIndex)"
          class="service-item-control"
          required
          :disabled="
            selectedItems.isConfirmed &&
            _selectedItems[currentStep - 1]?.variant?.title == props.variant.title
          "
        >
          <option value="" disabled selected>--Выберите опцию--</option>
          <option
            :id="i.toString()"
            v-for="(option, i) in select.items"
            :value="JSON.stringify(option)"
            :selected="selectedItems.items[selectIndex]?.title == option.title"
          >
            {{ option.title }}
          </option>
        </select>
      </div>
      <button
        type="submit"
        @click=""
        :class="
          _selectedItems[currentStep - 1]?.isConfirmed &&
          _selectedItems[currentStep - 1]?.variant?.title == props.variant.title
            ? 'service-item-select-confirm-selected'
            : 'service-item-select-confirm'
        "
      >
        {{
          _selectedItems[currentStep - 1]?.isConfirmed &&
          _selectedItems[currentStep - 1]?.variant?.title == props.variant.title
            ? 'Выбрано'
            : 'Выбрать'
        }}
      </button>
    </div>

    <button
      type="submit"
      v-if="variant.select.length == 0 && variant.options.length == 0"
      @click=""
      :class="
        _selectedItems[currentStep - 1]?.isConfirmed &&
        _selectedItems[currentStep - 1]?.variant?.title == props.variant.title
          ? 'default-service-item-select-confirm-selected'
          : 'default-service-item-select-confirm'
      "
    >
      {{
        _selectedItems[currentStep - 1]?.isConfirmed &&
        _selectedItems[currentStep - 1]?.variant?.title == props.variant.title
          ? 'Выбрано'
          : 'Выбрать'
      }}
    </button>
  </form>
</template>
