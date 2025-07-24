import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import { ReactElement } from 'react'

export const booleanRenderer = (value: boolean): ReactElement => {
  const iconMap: Record<string, ReactElement> = {
    true: <CheckCircleIcon color='success' />,
    false: <CancelIcon color='error' />,
  }

  return iconMap[String(value)]
}
