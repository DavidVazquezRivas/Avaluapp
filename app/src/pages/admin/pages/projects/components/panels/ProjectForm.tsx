import { useTranslation } from 'react-i18next'
import { Project } from '../../models/project.model'
import { FormControl, FormLabel, Stack, TextField } from '@mui/material'

interface ProjectFormProps {
  project?: Project
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ project }) => {
  const { t } = useTranslation()

  // const editing = !!project

  return (
    <Stack direction='column' spacing={3} width='100%' height='100%'>
      <FormControl sx={{ display: 'none' }}>
        <FormLabel htmlFor='id'>
          {t('admin.projects.form.fields.id.label')}
        </FormLabel>
        <TextField
          id='id'
          name='id'
          fullWidth
          variant='outlined'
          defaultValue={project?.id}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='name'>
          {t('admin.projects.form.fields.name.label')}
        </FormLabel>
        <TextField
          id='name'
          name='name'
          placeholder={t('admin.projects.form.fields.name.placeholder')}
          autoFocus
          required
          fullWidth
          variant='outlined'
          defaultValue={project?.name}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='description'>
          {t('admin.projects.form.fields.description.label')}
        </FormLabel>
        <TextField
          id='description'
          name='description'
          placeholder={t('admin.projects.form.fields.description.placeholder')}
          fullWidth
          multiline
          variant='outlined'
          defaultValue={project?.description}
        />
      </FormControl>
    </Stack>
  )
}

export default ProjectForm
