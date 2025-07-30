import { useQuery } from '@tanstack/react-query'
import getQuestionsQueryOptions from '../../queries/question/get.question.query'
import { QuestionType } from '@/models/question.model'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LoadingSpinner from '@/components/spinner/Spinner'
import { OptionSection } from './OptionSection'
import { dateRenderer } from '@/utils/renderers/date.renderer'
import getAllTagsQueryOptions from '../../queries/tag/getAll.tag.query'
import TagSection from './TagSection'

interface QuestionFormProps {
  questionId?: number
  projectId: number
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  questionId = null,
  projectId,
}) => {
  const { t } = useTranslation()
  const [selectedType, setSelectedType] = useState<QuestionType | null>(null)

  const { data, isFetching } = useQuery({
    ...getQuestionsQueryOptions(questionId ?? 0),
    enabled: questionId !== null,
  })

  const handleChangeType = (
    event: SelectChangeEvent<QuestionType>,
    _child?: React.ReactNode
  ) => {
    setSelectedType(event.target.value as QuestionType)
  }

  const types = Object.values(QuestionType).map((type) => (
    <MenuItem key={type} value={type}>
      {t(`globals.formatters.questionType.${type}`)}
    </MenuItem>
  ))

  if (isFetching) {
    return <LoadingSpinner />
  }

  return (
    <Stack direction='column' spacing={3} width='100%' height='100%'>
      <input type='hidden' name='id' value={projectId} />

      <FormControl>
        <FormLabel htmlFor='name'>
          {t('admin.projectdetail.tabs.questions.form.fields.name.label')}
        </FormLabel>
        <TextField
          id='name'
          name='name'
          placeholder={t(
            'admin.projectdetail.tabs.questions.form.fields.name.placeholder'
          )}
          autoFocus
          required
          fullWidth
          defaultValue={data?.name}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='text'>
          {t('admin.projectdetail.tabs.questions.form.fields.text.label')}
        </FormLabel>
        <TextField
          id='text'
          name='text'
          placeholder={t(
            'admin.projectdetail.tabs.questions.form.fields.text.placeholder'
          )}
          required
          fullWidth
          multiline
          defaultValue={data?.text}
        />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel htmlFor='questionType'>
          {t('admin.projectdetail.tabs.questions.form.fields.type.label')}
        </FormLabel>
        <Select
          id='questionType'
          name='questionType'
          defaultValue={selectedType ?? data?.questionType}
          label={t('admin.projectdetail.tabs.questions.form.fields.type.label')}
          onChange={handleChangeType}>
          {types}
        </Select>
      </FormControl>

      <TagSection projectId={projectId} selectedTags={data?.tags || []} />

      {questionId !== null && (
        <FormControl fullWidth>
          <FormLabel htmlFor='createdAt'>
            {t(
              'admin.projectdetail.tabs.questions.form.fields.createdAt.label'
            )}
          </FormLabel>
          <TextField
            id='createdAt'
            name='createdAt'
            value={dateRenderer(new Date(data?.createdAt))}
            disabled
            fullWidth
          />
        </FormControl>
      )}
      <OptionSection
        questionType={selectedType ?? data?.questionType}
        data={data?.options}
      />
      {(selectedType === QuestionType.Text ||
        (selectedType === null &&
          data?.questionType === QuestionType.Text)) && (
        <FormControl>
          <TextField
            name='maxLength'
            label={t(
              'admin.projectdetail.tabs.questions.form.fields.maxLength.label'
            )}
            placeholder={t(
              'admin.projectdetail.tabs.questions.form.fields.maxLength.placeholder'
            )}
            defaultValue={data?.maxLength ?? 0}
            fullWidth
            type='number'
          />
        </FormControl>
      )}
      <FormControlLabel
        name='required'
        control={<Checkbox defaultChecked={!!data?.required} />}
        label={t(
          'admin.projectdetail.tabs.questions.form.fields.required.label'
        )}
      />
    </Stack>
  )
}

export default QuestionForm
