import { Role } from '@/models/role.model'
import { User } from '@/models/user.model'
import {
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { useTranslation } from 'react-i18next'

interface UserFormProps {
  user?: User
}

export const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const { t } = useTranslation()

  const editing = !!user

  return (
    <Stack direction='column' spacing={3} width='100%' height='100%'>
      <FormControl sx={{ display: 'none' }}>
        <FormLabel htmlFor='id'>
          {t('admin.users.form.fields.id.label')}
        </FormLabel>
        <TextField
          id='id'
          name='id'
          fullWidth
          variant='outlined'
          defaultValue={user?.id}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='username'>
          {t('admin.users.form.fields.username.label')}
        </FormLabel>
        <TextField
          id='username'
          name='username'
          placeholder={t('admin.users.form.fields.username.placeholder')}
          autoComplete='username'
          autoFocus
          required
          fullWidth
          variant='outlined'
          defaultValue={user?.username}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='email'>
          {t('admin.users.form.fields.email.label')}
        </FormLabel>
        <TextField
          id='email'
          name='email'
          type='email'
          placeholder={t('admin.users.form.fields.email.placeholder')}
          autoComplete='email'
          required
          fullWidth
          variant='outlined'
          defaultValue={user?.email}
        />
      </FormControl>
      {!editing && (
        <FormControl>
          <FormLabel htmlFor='password'>
            {t('admin.users.form.fields.password.label')}
          </FormLabel>
          <TextField
            id='password'
            name='password'
            type='password'
            placeholder={t('admin.users.form.fields.password.placeholder')}
            autoComplete='current-password'
            required
            fullWidth
            variant='outlined'
          />
        </FormControl>
      )}
      <FormControl>
        <FormLabel htmlFor='role'>
          {t('admin.users.form.fields.role.label')}
        </FormLabel>
        <Select
          id='role'
          name='role'
          variant='outlined'
          fullWidth
          required
          defaultValue={user?.role ?? Role.User}>
          {Object.values(Role).map((role) => (
            <MenuItem key={role} value={role}>
              {t(`globals.formatters.role.${role}`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default UserForm
