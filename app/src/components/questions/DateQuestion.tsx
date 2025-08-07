import { FormControl, FormLabel, FormHelperText } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DateQuestionProps } from './types'
import { es } from 'date-fns/locale'

export default function DateQuestion({
  id,
  text,
  required = false,
  minDate,
  maxDate,
  error,
  helperText,
}: DateQuestionProps) {
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
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DatePicker
              {...field}
              minDate={minDate}
              maxDate={maxDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!fieldState.error || !!error,
                  variant: 'outlined',
                },
              }}
            />
          </LocalizationProvider>
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
