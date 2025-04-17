export type Variant = {
  title: string
  description: string
  color: string
  price_default: number
  options: Option[]
  select: { title: string; items: Option[] }[]
  selected: {
    options: {
      items: Option[]
      isSelected: boolean
    }
    select: {
      item: Option | null
      isSelected: boolean
    }
    // Сделал по отдельному состоянию select'у и options'ам для случая где в одном variant будут сразу заполнены поля options и select
    isDefaultOptionSelected: boolean // Для случая, где у variant select и options пусты
    price_default: number
  }
}

export type Option = {
  title: string
  price: number
}

export type Data = {
  title: string
  currentCost: number

  variants: Variant[]
}

export type SelectedItem = {
  variant: Variant
  items: Option[]
  isConfirmed: boolean
}
