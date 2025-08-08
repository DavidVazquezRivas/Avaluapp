import {
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@mui/material'
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
        <FormControl
          component='fieldset'
          error={!!fieldState.error || !!error}
          fullWidth
          sx={{ mb: 2 }}>
          <FormLabel component='legend' required={required}>
            {text}
          </FormLabel>
          <TextField
            {...field}
            type='number'
            required={required}
            error={!!fieldState.error || !!error}
            fullWidth
            inputProps={{
              min: min,
              max: max,
              step: 'any',
            }}
            sx={{ mt: 1 }}
            onChange={(e) => {
              const value = e.target.value
              field.onChange(value === '' ? '' : Number(value))
            }}
          />
          {(fieldState.error ||
            error ||
            helperText ||
            (min !== undefined && max !== undefined)) && (
            <FormHelperText>
              {fieldState.error?.message ||
                error ||
                helperText ||
                (min !== undefined && max !== undefined
                  ? t('globals.questions.validations.range', { min, max })
                  : '')}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
