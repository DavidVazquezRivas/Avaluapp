import i18n from '@/translation/i18n'
import { DefaultFilter } from '@/models/defaultfilter.model'
import { TFunction } from 'i18next'
import { SurveyStatus } from '@/models/survey.model'

export const getDefaultFilters = (
  t?: TFunction<'translation', undefined>
): DefaultFilter[] => {
  t = t ?? i18n.t
  return [
    {
      label: t('user.survey.grid.filters.status.accepted'),
      filterModel: {
        items: [
          {
            field: 'status',
            operator: 'equals',
            value: SurveyStatus.ACCEPTED,
          },
        ],
      },
    },
    {
      label: t('user.survey.grid.filters.status.pending'),
      filterModel: {
        items: [
          {
            field: 'status',
            operator: 'equals',
            value: SurveyStatus.PENDING,
          },
        ],
      },
    },
    {
      label: t('user.survey.grid.filters.status.all'),
      filterModel: {
        items: [
          {
            field: 'id',
            operator: 'different',
            value: '', // This effectively selects all surveys by excluding none
          },
        ],
      },
    },
  ]
}
