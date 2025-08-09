import { useTranslation } from 'react-i18next'
import { Survey } from '@/models/survey.model'
import { FormControl, FormLabel, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import SingleTagInput from './SingleTagInput'
import { UserAutocomplete } from './UserAutocomplete'

interface SurveyFormProps {
  projectId: number
  survey?: Survey
}

export const SurveyForm: React.FC<SurveyFormProps> = ({
  survey,
  projectId,
}) => {
  const { t } = useTranslation()

  const [selectedLeadId, setSelectedLeadId] = useState<number>(
    survey?.lead?.id ?? 0
  )

  const handleLeadChange = (userId: number) => {
    setSelectedLeadId(userId)
  }

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

      <UserAutocomplete
        selectedUserId={selectedLeadId}
        onUserChange={handleLeadChange}
        defaultUser={survey?.lead}
        label={t('admin.projectdetail.tabs.surveys.form.fields.lead.label')}
        placeholder={t(
          'admin.projectdetail.tabs.surveys.form.fields.lead.placeholder'
        )}
        required
      />

      <SingleTagInput projectId={projectId} selectedTag={survey?.tag} />
    </Stack>
  )
}
