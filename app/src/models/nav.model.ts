export interface NavItem {
  value: string
  href: string
  children?: NavItem[]
  unlocated?: boolean
}
