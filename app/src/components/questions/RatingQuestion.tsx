import {
  FormControl,
  FormLabel,
  FormHelperText,
  Rating,
  Box,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RatingQuestionProps } from './types'

export default function RatingQuestion({
  id,
  text,
  required = false,
  max = 5,
  precision = 1,
  error,
  helperText,
}: RatingQuestionProps) {
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
        min: {
          value: 1,
          message: t('globals.questions.validations.ratingRequired'),
        },
      }}
      render={({ field, fieldState }) => (
        <FormControl
          component='fieldset'
          error={!!fieldState.error || !!error}
          fullWidth
          sx={{ mb: 2 }}>
          <FormLabel component='legend' required={required} sx={{ mb: 1 }}>
            {text}
          </FormLabel>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating
              {...field}
              max={max}
              precision={precision}
              size='large'
              onChange={(_, value) => field.onChange(value)}
            />
            {field.value && (
              <Box sx={{ ml: 1, color: 'text.secondary' }}>
                {field.value}/{max}
              </Box>
            )}
          </Box>
          {(fieldState.error || error || helperText) && (
            <FormHelperText>
              {fieldState.error?.message || error || helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
