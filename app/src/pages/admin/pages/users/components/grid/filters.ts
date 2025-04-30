import { DefaultFilter } from '@/models/defaultfilter.model'
import { Role } from '@/models/role.model'
import i18n from '@/translation/i18n'
import { roleRenderer } from '@/utils/renderers/role.renderer'
import { TFunction } from 'i18next'

export const getDefaultFilters = (
  t?: TFunction<'translation', undefined>
): DefaultFilter[] => {
  t = t ?? i18n.t
  return [
    {
      label: t('admin.users.grid.filters.admin'),
      filterModel: {
        items: [
          {
            field: 'role',
            operator: 'contains',
            value: roleRenderer(Role.Admin, t),
          },
        ],
      },
    },
    {
      label: t('admin.users.grid.filters.user'),
      filterModel: {
        items: [
          {
            field: 'role',
            operator: 'contains',
            value: roleRenderer(Role.User, t),
          },
        ],
      },
    },
  ]
}
