import Grid from '@/components/grid/Grid'
import { User } from '@/models/user.model'
import { useTranslation } from 'react-i18next'
import { getColumns } from './columns'
import { getDefaultFilters } from './filters'
import { useEffect, useState } from 'react'
import { getUsers } from '@/pages/admin/pages/users/services/get.users.service'

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

  const columns = getColumns(t)
  const defaultFilters = getDefaultFilters(t)

  return <Grid defaultFilters={defaultFilters} rows={rows} columns={columns} />
}

export default UsersGrid
