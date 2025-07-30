import getAllSurveysQueryOptions from '../../queries/survey/getAll.survey.query'
import createSurveyQueryOptions from '../../queries/survey/create.survey.query'
import deleteSurveyQueryOptions from '../../queries/survey/delete.survey.query'
import updateSurveyQueryOptions from '../../queries/survey/update.survey.query'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { usePanel } from '@/contexts/PanelContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { PanelType } from '@/models/panels.model'
import { Survey, SurveyRequest } from '@/models/survey.model'
import { useMemo } from 'react'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { User } from '@/models/user.model'
import { dateRenderer } from '@/utils/renderers/date.renderer'
import Grid from '@/components/grid/Grid'
import { SurveyForm } from '../panels/SurveyForm'
import { surveyStatusRenderer } from '@/utils/renderers/surveyStatus.renderer'
import { Box, Stack } from '@mui/material'
import { tagRenderer } from '@/utils/renderers/tag.renderer'
import { Tag } from '@/models/tag.model'

interface SurveyGridProps {
  projectId: number
}

export const SurveyGrid: React.FC<SurveyGridProps> = ({ projectId }) => {
  const { t } = useTranslation()
  const { openPanel } = usePanel()
  const queryClient = useQueryClient()

  const { data, isLoading, isFetching } = useQuery(
    getAllSurveysQueryOptions(projectId)
  )

  const createMutation = useMutation(createSurveyQueryOptions(queryClient))

  const deleteMutation = useMutation(deleteSurveyQueryOptions(queryClient))

  const updateMutation = useMutation(updateSurveyQueryOptions(queryClient))

  const handleCreate = async (formData: FormData) => {
    const survey: SurveyRequest = {
      name: formData.get('name') as string,
      projectId: projectId,
      leadId: formData.get('leadId') as unknown as number,
      tag: formData.get('tag') as unknown as number,
    }

    await createMutation.mutateAsync(survey)
  }

  const onClickCreate = () => {
    openPanel({
      type: PanelType.FormDialog,
      title: t('admin.projectdetail.tabs.surveys.grid.actions.create.title'),
      content: <SurveyForm projectId={projectId} />,
      onSubmit: handleCreate,
      errorText: t(
        'admin.projectdetail.tabs.surveys.grid.actions.create.error'
      ),
    })
  }

  const handleDelete = (id: number, name: string) => {
    openPanel({
      type: PanelType.ConfirmDialog,
      title: t(
        'admin.projectdetail.tabs.surveys.grid.actions.delete.confirm.title'
      ),
      text: t(
        'admin.projectdetail.tabs.surveys.grid.actions.delete.confirm.text',
        { name }
      ),
      confirmText: t(
        'admin.projectdetail.tabs.surveys.grid.actions.delete.confirm.button.ok'
      ),
      cancelText: t(
        'admin.projectdetail.tabs.surveys.grid.actions.delete.confirm.button.cancel'
      ),
      onConfirm: () => deleteMutation.mutate(id),
    })
  }

  const handleUpdate = async (formData: FormData) => {
    const updatedSurvey: SurveyRequest = {
      id: formData.get('id') as unknown as number,
      name: formData.get('name') as string,
      projectId: projectId,
      leadId: formData.get('leadId') as unknown as number,
      tag: formData.get('tag') as unknown as number,
    }

    await updateMutation.mutateAsync(updatedSurvey)
  }

  const onClickUpdate = (survey: Survey) => {
    openPanel({
      type: PanelType.FormDialog,
      title: t('admin.projectdetail.tabs.surveys.grid.actions.edit.title'),
      content: <SurveyForm survey={survey} projectId={projectId} />,
      onSubmit: handleUpdate,
      errorText: t('admin.projectdetail.tabs.surveys.grid.actions.edit.error'),
    })
  }

  const onItemDoubleClick = (params: { row: Survey }) => {
    onClickUpdate(params.row)
  }

  const columns: GridColDef<Survey>[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: t('admin.projectdetail.tabs.surveys.grid.columns.name'),
        flex: 1,
      },
      {
        field: 'lead',
        headerName: t('admin.projectdetail.tabs.surveys.grid.columns.lead'),
        valueGetter: (value: User) => value.username,
        flex: 1,
      },
      // {
      //   field: 'urlCode',
      //   headerName: t('admin.projectdetail.tabs.surveys.grid.columns.urlCode'),
      //   flex: 1,
      // },
      {
        field: 'tag',
        headerName: t('admin.projectdetail.tabs.surveys.grid.columns.tag'),
        flex: 1,
        minWidth: 100,
        maxWidth: 150,
        renderCell: (params) => (
          <Stack direction='row' height='100%' spacing={1} alignItems='center'>
            {tagRenderer(params.value as Tag)}
          </Stack>
        ),
      },
      {
        field: 'createdAt',
        headerName: t(
          'admin.projectdetail.tabs.surveys.grid.columns.createdAt'
        ),
        flex: 1,
        valueGetter: (value: string) => dateRenderer(new Date(value)),
      },
      {
        field: 'status',
        headerAlign: 'center' as const,
        align: 'center' as const,
        headerName: t('admin.projectdetail.tabs.surveys.grid.columns.status'),
        renderCell: ({ value }) => (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            width='100%'
            height='100%'>
            {surveyStatusRenderer(value, t)}
          </Box>
        ),
      },
      {
        field: 'actions',
        type: 'actions',
        minWidth: 140,
        getActions: (params: { row: Survey }) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id, params.row.name)}
            label={t(
              'admin.projectdetail.tabs.surveys.grid.actions.delete.label'
            )}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            onClick={() => onClickUpdate(params.row)}
            label={t(
              'admin.projectdetail.tabs.surveys.grid.actions.edit.label'
            )}
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
        onClick: onClickCreate,
        label: t('admin.projectdetail.tabs.surveys.grid.actions.create.label'),
      }}
    />
  )
}

export default SurveyGrid
