import { QuestionOptionRequest, QuestionType } from '@/models/question.model'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface OptionSectionProps {
  questionType: QuestionType
  data?: QuestionOptionRequest[]
}

const initialState: QuestionOptionRequest[] = [{ text: '' }]

export const OptionSection: React.FC<OptionSectionProps> = ({
  questionType,
  data = initialState,
}) => {
  const { t } = useTranslation()
  const [options, setOptions] = useState<QuestionOptionRequest[]>(data)

  useEffect(() => {
    setOptions(data)
  }, [questionType])

  const handleAddOption = () => {
    setOptions([...options, { text: '' }])
  }

  if (
    questionType !== QuestionType.SingleChoice &&
    questionType !== QuestionType.MultipleChoice
  ) {
    return null
  }

  const renderedOptions = options.map((option, index) => (
    <Stack
      key={index}
      direction='row'
      spacing={1}
      width='100%'
      alignItems='center'>
      <TextField
        name={`options[${index}].text`}
        placeholder={t(
          'admin.projectdetail.tabs.questions.form.fields.options.placeholder'
        )}
        fullWidth
        value={option.text}
        onChange={(e) => {
          const newOptions = [...options]
          newOptions[index].text = e.target.value
          setOptions(newOptions)
        }}
      />
      <IconButton
        onClick={() => {
          const newOptions = options.filter((_, i) => i !== index)
          setOptions(newOptions)
        }}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  ))

  return (
    <Stack
      position='relative'
      role='fieldset'
      direction='column'
      spacing={2}
      width='100%'
      height='100%'
      sx={{
        backgroundColor: 'background.paper',
        padding: 2,
        pt: 3,
        borderRadius: 1,
      }}>
      <input type='hidden' name='options' value={JSON.stringify(options)} />
      <Typography
        component='legend'
        variant='h6'
        sx={{
          position: 'absolute',
          top: -24,
          left: 16,
          backgroundColor: 'background.paper',
          paddingX: 1,
          borderRadius: 2,
        }}>
        {t('admin.projectdetail.tabs.questions.form.fields.options.title')}
      </Typography>
      {renderedOptions}
      <Button fullWidth variant='outlined' onClick={handleAddOption}>
        <AddIcon />
      </Button>
    </Stack>
  )
}
