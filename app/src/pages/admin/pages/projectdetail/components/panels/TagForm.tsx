import { useTranslation } from 'react-i18next'
import getTagQueryOptions from '../../queries/tag/get.tag.query'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '@/components/spinner/Spinner'
import { FormControl, Stack, TextField, InputLabel, Box } from '@mui/material'
import ColorPickerInput from '@/components/inputs/ColorPickerInput'
import { QuestionSection } from './QuestionSection'

interface TagFormProps {
  tagId?: number
  projectId: number
}

export const TagForm: React.FC<TagFormProps> = ({
  tagId = null,
  projectId,
}) => {
  const { t } = useTranslation()

  const { data, isFetching } = useQuery({
    ...getTagQueryOptions(tagId ?? 0),
    enabled: tagId !== null,
  })

  if (isFetching) {
    return <LoadingSpinner />
  }

  return (
    <Stack direction='column' spacing={3} width='100%' height='100%'>
      <input type='hidden' name='id' value={projectId} />

      <FormControl fullWidth>
        <TextField
          name='name'
          label={t('admin.projectdetail.tabs.tags.form.name.label')}
          defaultValue={data?.name || ''}
          required
        />
      </FormControl>

      <FormControl fullWidth>
        <InputLabel shrink htmlFor='color-picker'>
          {t('admin.projectdetail.tabs.tags.form.color.label')}
        </InputLabel>
        <Box sx={{ mt: 2 }}>
          <ColorPickerInput
            type='color'
            name='color'
            id='color-picker'
            defaultValue={data?.color || '#000000'}
            required
          />
        </Box>
      </FormControl>

      <QuestionSection
        projectId={projectId}
        selectedQuestions={data?.questions || []}
      />
    </Stack>
  )
}

export default TagForm
