import { TFunction } from 'i18next'

export const dateRenderer = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function formatTimeAgo(
  dateString: string,
  t: TFunction<'translation', undefined>
): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()

  const minutes = Math.floor(diffMs / (1000 * 60))
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (minutes < 60) {
    return t('globals.formatters.date.ago.minutes', { count: minutes })
  } else if (hours < 24) {
    return t('globals.formatters.date.ago.hours', { count: hours })
  } else {
    return t('globals.formatters.date.ago.days', { count: days })
  }
}
