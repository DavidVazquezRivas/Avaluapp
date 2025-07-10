import Grid from '@/components/grid/Grid'
import getAllLeadSurveysQueryOptions from '../../queries/getAllLead.survey.query'
import acceptSurveyQueryOptions from '../../queries/accept.survey.query'
import rejectSurveyQueryOptions from '../../queries/reject.survey.query'
import CancelIcon from '@mui/icons-material/Cancel'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Survey, SurveyStatus } from '@/models/survey.model'
import { usePanel } from '@/contexts/PanelContext'
import { PanelType } from '@/models/panels.model'
import { useMemo } from 'react'
import { GridActionsCellItem } from '@mui/x-data-grid'
import { dateRenderer } from '@/utils/renderers/date.renderer'
import { getSurveyUrl } from '@/constants/routes'
import { surveyStatusRenderer } from '@/utils/renderers/surveyStatus.renderer'
import { Project } from '@/pages/admin/pages/projects/models/project.model'
import { getDefaultFilters } from './filters'

export const SurveyGrid = () => {
  const { t } = useTranslation()
  const { openPanel } = usePanel()
  const queryClient = useQueryClient()

  const { data, isLoading, isFetching } = useQuery(
    getAllLeadSurveysQueryOptions()
  )

  const acceptMutation = useMutation(acceptSurveyQueryOptions(queryClient))

  const rejectMutation = useMutation(rejectSurveyQueryOptions(queryClient))

  const handleAccept = async (id: number) => {
    await acceptMutation.mutateAsync(id)
  }

  const onClickAccept = (survey: Survey) => {
    openPanel({
      type: PanelType.ConfirmDialog,
      title: t('user.survey.grid.actions.accept.confirm.title'),
      text: t('user.survey.grid.actions.accept.confirm.text', {
        name: survey.name,
      }),
      onConfirm: () => handleAccept(survey.id),
    })
  }

  const handleReject = async (id: number) => {
    await rejectMutation.mutateAsync(id)
  }

  const onClickReject = (survey: Survey) => {
    openPanel({
      type: PanelType.ConfirmDialog,
      title: t('user.survey.grid.actions.reject.confirm.title'),
      text: t('user.survey.grid.actions.reject.confirm.text', {
        name: survey.name,
      }),
      onConfirm: () => handleReject(survey.id),
    })
  }

  const columns = useMemo(
    () => [
      {
        field: 'name',
        headerName: t('user.survey.grid.columns.name'),
        flex: 1,
      },
      {
        field: 'project',
        headerName: t('user.survey.grid.columns.admin'),
        valueGetter: (value: Project) => value.admin?.username || '',
        flex: 1,
      },
      {
        field: 'createdAt',
        headerName: t('user.survey.grid.columns.createdAt'),
        flex: 1,
        valueGetter: (value: string) => dateRenderer(new Date(value)),
      },
      {
        field: 'status',
        headerAlign: 'center' as const,
        align: 'center' as const,
        headerName: t('user.survey.grid.columns.status'),
        maxWidth: 120,
        renderCell: (params: any) => surveyStatusRenderer(params.value, t),
      },
      {
        field: 'actions',
        type: 'actions' as const,
        width: 140,
        align: 'left' as const,
        getActions: (params: any) => {
          const actions = []

          if (params.row.status === SurveyStatus.ACCEPTED) {
            actions.push(
              <GridActionsCellItem
                key='copy'
                icon={<ContentCopyIcon />}
                label={t('user.survey.grid.actions.copy.label')}
                onClick={() =>
                  navigator.clipboard.writeText(
                    getSurveyUrl(params.row.urlCode)
                  )
                }
              />
            )
          }

          if (params.row.status === SurveyStatus.PENDING) {
            actions.push(
              <GridActionsCellItem
                key='accept'
                icon={<CheckCircleIcon color='success' />}
                label={t('user.survey.grid.actions.accept.label')}
                onClick={() => onClickAccept(params.row)}
              />,
              <GridActionsCellItem
                key='reject'
                icon={<CancelIcon color='error' />}
                label={t('user.survey.grid.actions.reject.label')}
                onClick={() => onClickReject(params.row)}
              />
            )
          }

          return actions
        },
      },
    ],
    [t]
  )

  const defaultFilters = useMemo(() => getDefaultFilters(t), [t])

  return (
    <Grid
      isLoading={isLoading || isFetching}
      rows={data ?? []}
      columns={columns}
      defaultFilters={defaultFilters}
    />
  )
}

export default SurveyGrid
