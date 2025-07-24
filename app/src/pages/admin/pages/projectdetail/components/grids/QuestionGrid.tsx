import getAllQuestionsQueryOptions from '../../queries/question/getAll.question.query'
import createQuestionQueryOptions from '../../queries/question/create.question.query'
import deleteQuestionQueryOptions from '../../queries/question/delete.question.query'
import updateQuestionQueryOptions from '../../queries/question/update.question.query'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { usePanel } from '@/contexts/PanelContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import {
  Question,
  QuestionRequest,
  QuestionType,
} from '@/models/question.model'
import { PanelType } from '@/models/panels.model'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'
import Grid from '@/components/grid/Grid'
import { dateRenderer } from '@/utils/renderers/date.renderer'
import { booleanRenderer } from '@/utils/renderers/boolean.renderer'
import { Box } from '@mui/material'
import QuestionForm from '../panels/QuestionForm'

interface QuestionGridProps {
  projectId: number
}

export const QuestionGrid: React.FC<QuestionGridProps> = ({ projectId }) => {
  const { t } = useTranslation()
  const { openPanel } = usePanel()
  const queryClient = useQueryClient()

  const { data, isLoading, isFetching } = useQuery(
    getAllQuestionsQueryOptions(projectId)
  )

  const createMutation = useMutation(createQuestionQueryOptions(queryClient))

  const deleteMutation = useMutation(deleteQuestionQueryOptions(queryClient))

  const updateMutation = useMutation(updateQuestionQueryOptions(queryClient))

  const handleCreate = async (formData: FormData) => {
    const question: QuestionRequest = {
      text: formData.get('text') as string,
      projectId: projectId,
      questionType: formData.get('questionType') as QuestionType,
      required: formData.get('required') === 'on',
      maxLength: formData.get('maxLength')
        ? Number(formData.get('maxLength'))
        : undefined,
      options: formData.get('options')
        ? JSON.parse(formData.get('options') as string)
        : undefined,
    }

    await createMutation.mutateAsync(question)
  }

  const onClickCreate = () => {
    openPanel({
      type: PanelType.FormDialog,
      title: t('admin.projectdetail.tabs.questions.grid.actions.create.title'),
      content: <QuestionForm projectId={projectId} />,
      onSubmit: handleCreate,
      errorText: t(
        'admin.projectdetail.tabs.questions.grid.actions.create.error'
      ),
    })
  }

  const handleEdit = async (formData: FormData, questionId: number) => {
    const question: QuestionRequest = {
      id: questionId,
      text: formData.get('text') as string,
      projectId: projectId,
      questionType: formData.get('questionType') as QuestionType,
      required: formData.get('required') === 'on',
      maxLength: formData.get('maxLength')
        ? Number(formData.get('maxLength'))
        : undefined,
      options: formData.get('options')
        ? JSON.parse(formData.get('options') as string)
        : undefined,
    }

    await updateMutation.mutateAsync(question)
  }

  const onClickEdit = (question: Question) => {
    openPanel({
      type: PanelType.FormDialog,
      title: t('admin.projectdetail.tabs.questions.grid.actions.edit.title'),
      content: <QuestionForm questionId={question.id} projectId={projectId} />,
      onSubmit: (formData) => handleEdit(formData, question.id),
      errorText: t(
        'admin.projectdetail.tabs.questions.grid.actions.edit.error'
      ),
    })
  }

  const handleDelete = (id: number, text: string) => {
    openPanel({
      type: PanelType.ConfirmDialog,
      title: t(
        'admin.projectdetail.tabs.questions.grid.actions.delete.confirm.title'
      ),
      text: t(
        'admin.projectdetail.tabs.questions.grid.actions.delete.confirm.text',
        { text }
      ),
      confirmText: t(
        'admin.projectdetail.tabs.questions.grid.actions.delete.confirm.button.ok'
      ),
      cancelText: t(
        'admin.projectdetail.tabs.questions.grid.actions.delete.confirm.button.cancel'
      ),
      onConfirm: () => deleteMutation.mutate(id),
    })
  }

  const columns: GridColDef<Question>[] = useMemo(
    () => [
      {
        field: 'text',
        headerName: t('admin.projectdetail.tabs.questions.grid.columns.text'),
        flex: 1,
        minWidth: 200,
      },
      {
        field: 'questionType',
        headerName: t('admin.projectdetail.tabs.questions.grid.columns.type'),
        flex: 1,
        minWidth: 150,
        valueGetter: (value: QuestionType) =>
          t(`globals.formatters.questionType.${value}`),
      },
      {
        field: 'createdAt',
        headerName: t(
          'admin.projectdetail.tabs.questions.grid.columns.createdAt'
        ),
        flex: 1,
        valueGetter: (value: string) => dateRenderer(new Date(value)),
      },
      {
        field: 'required',
        headerName: t(
          'admin.projectdetail.tabs.questions.grid.columns.required'
        ),
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
            {booleanRenderer(params.value)}
          </Box>
        ),
      },
      {
        field: 'actions',
        type: 'actions',
        getActions: (params: { row: Question }) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => handleDelete(params.row.id, params.row.text)}
            label={t(
              'admin.projectdetail.tabs.questions.grid.actions.delete.label'
            )}
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            onClick={() => onClickEdit(params.row)}
            label={t(
              'admin.projectdetail.tabs.questions.grid.actions.edit.label'
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
      createButton={{
        onClick: onClickCreate,
        label: t(
          'admin.projectdetail.tabs.questions.grid.actions.create.label'
        ),
      }}
    />
  )
}

export default QuestionGrid
