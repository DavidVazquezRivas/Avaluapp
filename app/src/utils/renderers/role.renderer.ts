import { Role } from '@/models/role.model'
import i18n from '@/translation/i18n'
import { TFunction } from 'i18next'

export const roleRenderer = (
  role: Role,
  t?: TFunction<'translation', undefined>
) => {
  t = t ?? i18n.t
  return t(`globals.formatters.role.${role}`)
}
