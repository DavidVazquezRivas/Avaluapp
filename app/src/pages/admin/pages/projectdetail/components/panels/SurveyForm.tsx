import { useTranslation } from 'react-i18next'
import { Survey } from '@/models/survey.model'
import {
  Autocomplete,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from '@mui/material'
import { User } from '@/models/user.model'
import { useMemo, useState } from 'react'
import store from '@/redux/store'
import { Role } from '@/models/role.model'

interface SurveyFormProps {
  survey?: Survey
}

export const SurveyForm: React.FC<SurveyFormProps> = ({ survey }) => {
  const { t } = useTranslation()

  const [selectedLeadId, setSelectedLeadId] = useState<number>(
    survey?.lead?.id ?? 0
  )

  const users = store.getState().user.user
  const leads: User[] = useMemo(
    () => users.filter((u) => u.role === Role.User),
    [users]
  )

  return (
    <Stack direction='column' spacing={3} width='100%' height='100%'>
      <input type='hidden' name='leadId' value={selectedLeadId} />

      <FormControl sx={{ display: 'none' }}>
        <FormLabel htmlFor='id'>
          {t('admin.projectdetail.tabs.surveys.form.fields.id.label')}
        </FormLabel>
        <TextField
          id='id'
          name='id'
          fullWidth
          variant='outlined'
          defaultValue={survey?.id}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='name'>
          {t('admin.projectdetail.tabs.surveys.form.fields.name.label')}
        </FormLabel>
        <TextField
          id='name'
          name='name'
          placeholder={t(
            'admin.projectdetail.tabs.surveys.form.fields.name.placeholder'
          )}
          autoFocus
          required
          fullWidth
          variant='outlined'
          defaultValue={survey?.name}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='lead'>
          {t('admin.projectdetail.tabs.surveys.form.fields.lead.label')}
        </FormLabel>
        <Autocomplete
          id='lead'
          options={leads}
          getOptionLabel={(option) => option.username}
          defaultValue={leads.find((l) => l.id === survey?.lead?.id) || null}
          onChange={(_, value) => {
            setSelectedLeadId(value?.id ?? 0)
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          sx={{ '& .MuiAutocomplete-endAdornment': { display: 'none' } }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={t(
                'admin.projectdetail.tabs.surveys.form.fields.lead.placeholder'
              )}
              variant='outlined'
              fullWidth
            />
          )}
        />
      </FormControl>
    </Stack>
  )
}
