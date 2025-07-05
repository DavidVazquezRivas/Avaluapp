import Grid from '@/components/grid/Grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ProjectForm from '../panels/ProjectForm'
import getAllProjectsQueryOptions from '../../queries/getAll.project.query'
import createProjectQueryOptions from '../../queries/create.project.query'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Project, ProjectBase } from '../../models/project.model'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from '@/models/user.model'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Box, Tooltip, Typography } from '@mui/material'
import { dateRenderer } from '@/utils/renderers/date.renderer'
import { usePanel } from '@/contexts/PanelContext'
import { PanelType } from '@/models/panels.model'
import deleteProjectQueryOptions from '../../queries/delete.project.query'
import updateProjectQueryOptions from '../../queries/update.project.query'

export const ProjectsGrid = () => {
  const { t } = useTranslation()
  const { openPanel } = usePanel()
  const queryClient = useQueryClient()

  const { data, isLoading, isFetching } = useQuery(getAllProjectsQueryOptions())

  const createMutation = useMutation(createProjectQueryOptions(queryClient))

  const deleteMutation = useMutation(deleteProjectQueryOptions(queryClient))

  const updateMutation = useMutation(updateProjectQueryOptions(queryClient))

  const handleCreate = async (formData: FormData) => {
    const project: ProjectBase = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
    }

    await createMutation.mutateAsync(project)
  }

  const onClickCreate = () => {
    openPanel({
      type: PanelType.FormDialog,
      title: t('admin.projects.grid.actions.create.title'),
      content: <ProjectForm />,
      onSubmit: handleCreate,
      errorText: t('admin.projects.grid.actions.create.error'),
    })
  }

  const handleDelete = (id: number, name: string) => {
    openPanel({
      type: PanelType.ConfirmDialog,
      title: t('admin.projects.grid.actions.delete.confirm.title'),
      text: t('admin.projects.grid.actions.delete.confirm.text', { name }),
      confirmText: t('admin.projects.grid.actions.delete.confirm.button.ok'),
      cancelText: t('admin.projects.grid.actions.delete.confirm.button.cancel'),
      onConfirm: () => deleteMutation.mutate(id),
    })
  }

  const handleUpdate = async (formData: FormData) => {
    const updatedProject: Project = {
      id: formData.get('id') as unknown as number,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
    }

    await updateMutation.mutateAsync(updatedProject)
  }

  const onClickUpdate = (project: Project) => {
    openPanel({
      type: PanelType.FormDialog,
      title: t('admin.projects.grid.actions.update.title'),
      content: <ProjectForm project={project} />,
      onSubmit: handleUpdate,
      errorText: t('admin.projects.grid.actions.update.error'),
    })
  }

  const columns: GridColDef<Project>[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: t('admin.projects.grid.columns.name'),
        minWidth: 200,
      },
      {
        field: 'description',
        headerName: t('admin.projects.grid.columns.description'),
        minWidth: 400,
        renderCell: (params) => (
          <Tooltip title={params.value || ''}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                overflow: 'hidden',
              }}>
              <Typography
                noWrap
                variant='body2'
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                {params.value}
              </Typography>
            </Box>
          </Tooltip>
        ),
      },
      {
        field: 'createdAt',
        headerName: t('admin.projects.grid.columns.createdAt'),
        minWidth: 150,
        renderCell: (params) => {
          const date = new Date(params.value)
          return dateRenderer(date)
        },
      },
      {
        field: 'admin',
        headerName: t('admin.projects.grid.columns.admin'),
        minWidth: 200,
        valueGetter: (value: User) => value.username,
      },
      {
        field: 'actions',
        type: 'actions',
        minWidth: 80,
        getActions: (params: { row: Project }) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id, params.row.name)}
            label={t('admin.projects.grid.actions.delete.label')}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            onClick={() => onClickUpdate(params.row)}
            label={t('admin.projects.grid.actions.update.label')}
          />,
        ],
      },
    ],
    [t]
  )

  return (
    <Grid
      isLoading={isLoading || isFetching}
      rows={data ?? []}
      columns={columns}
      createButton={{
        onClick: onClickCreate,
        label: t('admin.projects.grid.actions.create.label'),
      }}
    />
  )
}

export default ProjectsGrid
