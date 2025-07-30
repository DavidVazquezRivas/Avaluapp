import getAllTagsQueryOptions from '../../queries/tag/getAll.tag.query'
import createTagQueryOptions from '../../queries/tag/create.tag.query'
import deleteTagQueryOptions from '../../queries/tag/delete.tag.query'
import updateTagQueryOptions from '../../queries/tag/update.tag.query'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { usePanel } from '@/contexts/PanelContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { PanelType } from '@/models/panels.model'
import { Tag, TagRequest } from '@/models/tag.model'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import Grid from '@/components/grid/Grid'
import { Box } from '@mui/material'
import { colorRenderer } from '@/utils/renderers/color.renderer'
import TagForm from '../panels/TagForm'

interface TagGridProps {
  projectId: number
}

export const TagGrid: React.FC<TagGridProps> = ({ projectId }) => {
  const { t } = useTranslation()
  const { openPanel } = usePanel()
  const queryClient = useQueryClient()

  const { data, isLoading, isFetching } = useQuery(
    getAllTagsQueryOptions(projectId)
  )

  const createMutation = useMutation(createTagQueryOptions(queryClient))

  const deleteMutation = useMutation(deleteTagQueryOptions(queryClient))

  const updateMutation = useMutation(updateTagQueryOptions(queryClient))

  const handleCreate = async (formData: FormData) => {
    const tag: TagRequest = {
      name: formData.get('name') as string,
      color: formData.get('color') as string,
      questionIds: formData.get('questions')
        ? JSON.parse(formData.get('questions') as string)
        : [],
      projectId: projectId,
    }

    await createMutation.mutateAsync(tag)
  }

  const onClickCreate = () => {
    openPanel({
      type: PanelType.FormDialog,
      title: t('admin.projectdetail.tabs.tags.grid.actions.create.title'),
      content: <TagForm projectId={projectId} />,
      onSubmit: handleCreate,
      errorText: t('admin.projectdetail.tabs.tags.grid.actions.create.error'),
    })
  }

  const handleFormSubmit = async (formData: FormData, tagId: number) => {
    const tag: TagRequest = {
      id: tagId,
      name: formData.get('name') as string,
      color: formData.get('color') as string,
      questionIds: formData.get('questions')
        ? JSON.parse(formData.get('questions') as string)
        : [],
      projectId: projectId,
    }

    await updateMutation.mutateAsync(tag)
  }

  const onClickEdit = (tag: Tag) => {
    openPanel({
      type: PanelType.FormDialog,
      title: t('admin.projectdetail.tabs.tags.grid.actions.edit.title'),
      content: <TagForm tagId={tag.id} projectId={projectId} />,
      onSubmit: (formData) => handleFormSubmit(formData, tag.id),
      errorText: t('admin.projectdetail.tabs.tags.grid.actions.edit.error'),
    })
  }

  const onItemDoubleClick = (params: { row: Tag }) => {
    onClickEdit(params.row)
  }

  const handleDelete = (id: number, name: string) => {
    openPanel({
      type: PanelType.ConfirmDialog,
      title: t(
        'admin.projectdetail.tabs.tags.grid.actions.delete.confirm.title'
      ),
      text: t(
        'admin.projectdetail.tabs.tags.grid.actions.delete.confirm.text',
        {
          name,
        }
      ),
      confirmText: t(
        'admin.projectdetail.tabs.tags.grid.actions.delete.confirm.button.ok'
      ),
      cancelText: t(
        'admin.projectdetail.tabs.tags.grid.actions.delete.confirm.button.cancel'
      ),
      onConfirm: () => deleteMutation.mutate(id),
    })
  }

  const columns: GridColDef<Tag>[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: t('admin.projectdetail.tabs.tags.grid.columns.name'),
        flex: 1,
        minWidth: 150,
        maxWidth: 250,
      },
      {
        field: 'color',
        headerName: t('admin.projectdetail.tabs.tags.grid.columns.color'),
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        minWidth: 100,
        maxWidth: 100,
        renderCell: (params) => (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            width='100%'
            height='100%'>
            {colorRenderer(params.row.color)}
          </Box>
        ),
      },
      {
        field: 'actions',
        type: 'actions',
        getActions: (params: { row: Tag }) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id, params.row.name)}
            label={t('admin.projectdetail.tabs.tags.grid.actions.delete.label')}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            onClick={() => onClickEdit(params.row)}
            label={t('admin.projectdetail.tabs.tags.grid.actions.edit.label')}
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
      onRowDoubleClick={onItemDoubleClick}
      createButton={{
        label: t('admin.projectdetail.tabs.tags.grid.actions.create.label'),
        onClick: onClickCreate,
      }}
    />
  )
}
