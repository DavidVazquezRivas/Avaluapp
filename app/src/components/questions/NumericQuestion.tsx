import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NumericQuestionProps } from './types'

export default function NumericQuestion({
  id,
  text,
  required = false,
  min,
  max,
  error,
  helperText,
}: NumericQuestionProps) {
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
        min:
          min !== undefined
            ? {
                value: min,
                message: t('globals.questions.validations.minValue', { min }),
              }
            : undefined,
        max:
          max !== undefined
            ? {
                value: max,
                message: t('globals.questions.validations.maxValue', { max }),
              }
            : undefined,
        pattern: {
          value: /^-?\d*\.?\d+$/,
          message: t('globals.questions.validations.invalidNumber'),
        },
      }}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          label={text}
          type='number'
          required={required}
          error={!!fieldState.error || !!error}
          helperText={
            fieldState.error?.message ||
            error ||
            helperText ||
            (min !== undefined && max !== undefined
              ? t('globals.questions.validations.range', { min, max })
              : '')
          }
          fullWidth
          inputProps={{
            min: min,
            max: max,
            step: 'any',
          }}
          sx={{ mb: 2 }}
          onChange={(e) => {
            const value = e.target.value
            field.onChange(value === '' ? '' : Number(value))
          }}
        />
      )}
    />
  )
}
