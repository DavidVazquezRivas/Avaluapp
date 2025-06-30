import { useTranslation } from 'react-i18next'
import { GridLocaleText } from '@mui/x-data-grid'
import { getGridLocaleText } from '@/utils/grid.utils'

export const useGridLocaleText = (): Partial<GridLocaleText> => {
  const { t } = useTranslation()

  return getGridLocaleText(t)
}
