import { Question } from '@/models/question.model'
import { useTranslation } from 'react-i18next'
import getAllQuestionsQueryOptions from '../../queries/question/getAll.question.query'
import { useEffect, useState } from 'react'
import {
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Checkbox,
  Box,
  OutlinedInput,
  ListItemText,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'

interface QuestionSectionProps {
  projectId: number
  selectedQuestions?: Question[]
  onChange?: (selectedQuestionIds: number[]) => void
}

export const QuestionSection: React.FC<QuestionSectionProps> = ({
  projectId,
  selectedQuestions = [],
  onChange,
}) => {
  const { t } = useTranslation()
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<number[]>([])

  const { data: questionsData, isFetching: isQuestionsFetching } = useQuery(
    getAllQuestionsQueryOptions(projectId)
  )

  useEffect(() => {
    if (selectedQuestions.length > 0) {
      const questionIds = selectedQuestions.map((question) => question.id)
      setSelectedQuestionIds(questionIds)
    }
  }, [selectedQuestions])

  const handleQuestionsChange = (
    event: SelectChangeEvent<typeof selectedQuestionIds>
  ) => {
    const value = event.target.value
    const newSelectedIds =
      typeof value === 'string' ? value.split(',').map(Number) : value
    setSelectedQuestionIds(newSelectedIds)
    onChange?.(newSelectedIds)
  }

  if (isQuestionsFetching) {
    return (
      <FormControl fullWidth>
        <FormLabel>
          {t('admin.projectdetail.tabs.tags.form.questions.label')}
        </FormLabel>
        <Select disabled multiline>
          <MenuItem value=''>
            {t('admin.projectdetail.tabs.tags.form.questions.loading')}
          </MenuItem>
        </Select>
      </FormControl>
    )
  }

  return (
    <>
      <input
        type='hidden'
        name='questions'
        value={JSON.stringify(selectedQuestionIds)}
      />

      <FormControl fullWidth>
        <FormLabel htmlFor='questions'>
          {t('admin.projectdetail.tabs.tags.form.questions.label')}
        </FormLabel>
        <Select
          id='questions'
          multiple
          name='questions'
          value={selectedQuestionIds}
          onChange={handleQuestionsChange}
          input={<OutlinedInput multiline />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((questionId) => {
                const question = questionsData?.find(
                  (q: Question) => q.id === questionId
                )
                return question ? (
                  <span
                    key={questionId}
                    style={{
                      backgroundColor: '#e3f2fd',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.875rem',
                      color: '#1976d2',
                    }}>
                    {question.name}
                  </span>
                ) : null
              })}
            </Box>
          )}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 224,
                width: 250,
              },
            },
          }}>
          {questionsData?.map((question: Question) => (
            <MenuItem key={question.id} value={question.id} sx={{ my: 0.5 }}>
              <Checkbox
                checked={selectedQuestionIds.indexOf(question.id) > -1}
              />
              <ListItemText primary={question.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
