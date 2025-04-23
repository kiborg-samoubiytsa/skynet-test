export type Variant = {
  title: string
  description: string
  color: string
  price_default: number
  options: Option[]
  select: { title: string; items: Option[] }[]
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
