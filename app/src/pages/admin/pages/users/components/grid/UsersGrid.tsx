import Grid from '@/components/grid/Grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { User, UserWithCredentials } from '@/models/user.model'
import { Role } from '@/models/role.model'
import { PanelType } from '@/models/panels.model'
import { usePanel } from '@/contexts/PanelContext'
import { roleRenderer } from '@/utils/renderers/role.renderer'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDefaultFilters } from './filters'
import UserForm from '../panels/UserForm'
import getUsersQueryOptions from '../../queries/get.users.query'
import deleteUsersQueryOptions from '../../queries/delete.users.query'
import createUsersQueryOptions from '../../queries/create.users.query'
import updateUsersQueryOptions from '../../queries/update.users.query'

export const UsersGrid = () => {
  const { t } = useTranslation()
  const { openPanel } = usePanel()
  const queryClient = useQueryClient()

  const {
    data: usersData,
    isLoading,
    isFetching,
  } = useQuery(getUsersQueryOptions())

  const deleteMutation = useMutation(deleteUsersQueryOptions(queryClient))

  const createMutation = useMutation(createUsersQueryOptions(queryClient))

  const updateMutation = useMutation(updateUsersQueryOptions(queryClient))

  const handleDelete = (id: number, username: string) => {
    openPanel({
      type: PanelType.ConfirmDialog,
      title: t('admin.users.grid.actions.delete.confirm.title'),
      text: t('admin.users.grid.actions.delete.confirm.text', { username }),
      confirmText: t('admin.users.grid.actions.delete.confirm.button.ok'),
      cancelText: t('admin.users.grid.actions.delete.confirm.button.cancel'),
      onConfirm: () => deleteMutation.mutate(id),
    })
  }

  const handleCreate = async (formData: FormData) => {
    const user: UserWithCredentials = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      role: formData.get('role') as Role,
    }

    await createMutation.mutateAsync(user)
  }

  const onClickCreate = () => {
    openPanel({
      type: PanelType.FormDialog,
      title: t('admin.users.form.title.create'),
      content: <UserForm />,
      onSubmit: handleCreate,
      errorText: t('admin.users.form.error.create'),
    })
  }

  const handleEdit = async (formData: FormData) => {
    const updatedUser: User = {
      id: formData.get('id') as unknown as number,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as Role,
    }

    await updateMutation.mutateAsync(updatedUser)
  }

  const onClickEdit = (user: User) => {
    openPanel({
      type: PanelType.FormDialog,
      title: t('admin.users.form.title.edit'),
      content: <UserForm user={user} />,
      onSubmit: handleEdit,
      errorText: t('admin.users.form.error.update'),
    })
  }

  const columns: GridColDef<User>[] = useMemo(
    () => [
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
      {
        field: 'actions',
        type: 'actions',
        minWidth: 80,
        getActions: (params: { row: User }) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id, params.row.username)}
            label={t('admin.users.grid.actions.delete.label')}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            onClick={() => onClickEdit(params.row)}
            label={t('admin.users.grid.actions.edit')}
          />,
        ],
      },
    ],
    [t]
  )

  const defaultFilters = getDefaultFilters(t)

  return (
    <Grid
      isLoading={isLoading || isFetching}
      defaultFilters={defaultFilters}
      rows={usersData ?? []}
      columns={columns}
      createButton={{ onClick: onClickCreate, label: 'Crear usuario' }}
    />
  )
}

export default UsersGrid
