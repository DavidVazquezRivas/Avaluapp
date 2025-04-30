import { User } from '@/models/user.model'
import i18n from '@/translation/i18n'
import { roleRenderer } from '@/utils/renderers/role.renderer'
import { GridColDef } from '@mui/x-data-grid'
import { TFunction } from 'i18next'

export const getColumns = (
  t?: TFunction<'translation', undefined>
): GridColDef<User>[] => {
  t = t ?? i18n.t
  return [
    {
      field: 'id',
      headerName: t('admin.users.grid.columns.id'),
      minWidth: 60,
      sortable: false,
    },
    {
      field: 'username',
      headerName: t('admin.users.grid.columns.username'),
      minWidth: 150,
      sortable: false,
    },
    {
      field: 'email',
      headerName: t('admin.users.grid.columns.email'),
      minWidth: 250,
      sortable: false,
    },
    {
      field: 'role',
      headerName: t('admin.users.grid.columns.role'),
      minWidth: 150,
      sortable: false,
      valueGetter: (value) => roleRenderer(value, t),
    },
  ]
}
