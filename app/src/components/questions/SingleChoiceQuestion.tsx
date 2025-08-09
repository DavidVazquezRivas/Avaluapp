import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { OptionBasedQuestionProps } from './types'

export default function SingleChoiceQuestion({
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
          <RadioGroup {...field} aria-labelledby={`${id}-label`}>
            {options.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id.toString()}
                control={<Radio />}
                label={option.text}
              />
            ))}
          </RadioGroup>
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
