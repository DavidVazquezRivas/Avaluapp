import Grid from '@/components/grid/Grid'
import { User } from '@/models/user.model'
import { useTranslation } from 'react-i18next'
import { getDefaultFilters } from './filters'
import { useEffect, useState } from 'react'
import { getUsers } from '@/pages/admin/pages/users/services/get.users.service'
import { roleRenderer } from '@/utils/renderers/role.renderer'
import { Role } from '@/models/role.model'

export const UsersGrid = () => {
  const [rows, setRows] = useState<User[]>([])
  const { t } = useTranslation()

  const callGetUsers = async () => {
    const { data } = await getUsers()
    setRows(data.data)
  }

  useEffect(() => {
    callGetUsers()
  }, [])

  const columns = [
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
      valueGetter: (value: Role) => roleRenderer(value, t),
    },
  ]
  const defaultFilters = getDefaultFilters(t)

  return <Grid defaultFilters={defaultFilters} rows={rows} columns={columns} />
}

export default UsersGrid
