export function getContrastingTextColor(hexColor: string) {
  hexColor = hexColor.replace('#', '')

  const r = parseInt(hexColor.substring(0, 2), 16)
  const g = parseInt(hexColor.substring(2, 4), 16)
  const b = parseInt(hexColor.substring(4, 6), 16)

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b

  return luminance > 186 ? '#000000' : '#FFFFFF'
}
