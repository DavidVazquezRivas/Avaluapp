import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TextQuestionProps } from './types'

export default function TextQuestion({
  id,
  text,
  required = false,
  maxLength,
  multiline = false,
  error,
  helperText,
}: TextQuestionProps) {
  const { control } = useFormContext()
  const { t } = useTranslation()

  return (
    <Controller
      name={id}
      control={control}
      rules={{
        required: required
          ? t('globals.questions.validations.required')
          : false,
        maxLength: maxLength
          ? {
              value: maxLength,
              message: t('globals.questions.validations.maxLength', {
                max: maxLength,
              }),
            }
          : undefined,
      }}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error || !!error
        const characterCount = maxLength
          ? t('globals.questions.validations.charactersCount', {
              current: field.value?.length || 0,
              max: maxLength,
            })
          : ''

        const displayHelperText = hasError
          ? fieldState.error?.message || error
          : helperText || characterCount

        return (
          <TextField
            {...field}
            label={text}
            required={required}
            error={hasError}
            helperText={displayHelperText}
            fullWidth
            multiline={multiline}
            rows={multiline ? 4 : 1}
            inputProps={{
              maxLength: maxLength,
            }}
            sx={{ mb: 2 }}
          />
        )
      }}
    />
  )
}
