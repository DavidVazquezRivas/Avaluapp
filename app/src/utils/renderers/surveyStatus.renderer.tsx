import CircleIcon from '@mui/icons-material/Circle'
import { SurveyStatus } from '@/models/survey.model'
import { SvgIconProps } from '@mui/material/SvgIcon'
import { Tooltip } from '@mui/material'

export const surveyStatusRenderer = (
  status: SurveyStatus,
  t: (key: string) => string
) => {
  const colorMap: Record<SurveyStatus, SvgIconProps['color']> = {
    [SurveyStatus.PENDING]: 'warning',
    [SurveyStatus.ACCEPTED]: 'success',
    [SurveyStatus.REJECTED]: 'error',
  }

  const tooltipText = t(`globals.formatters.surveyStatus.${status}`)

  return (
    <Tooltip title={tooltipText}>
      <CircleIcon color={colorMap[status]} />
    </Tooltip>
  )
}
