import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Checkbox,
  FormGroup,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { OptionBasedQuestionProps } from './types'

export default function MultipleChoiceQuestion({
  id,
  text,
  required = false,
  options,
  error,
  helperText,
}: OptionBasedQuestionProps) {
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
        validate: (value) => {
          if (required && (!value || value.length === 0)) {
            return t('globals.questions.validations.multipleChoiceRequired')
          }
          return true
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
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    checked={
                      field.value?.includes(option.id.toString()) || false
                    }
                    onChange={(e) => {
                      const currentValue = field.value || []
                      const optionValue = option.id.toString()

                      if (e.target.checked) {
                        field.onChange([...currentValue, optionValue])
                      } else {
                        field.onChange(
                          currentValue.filter((v: string) => v !== optionValue)
                        )
                      }
                    }}
                  />
                }
                label={option.text}
              />
            ))}
          </FormGroup>
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
