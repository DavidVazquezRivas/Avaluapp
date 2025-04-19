import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import Checkbox from '@mui/material/Checkbox'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { createSession } from '@/utils/session.utils'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes } from '@/constants/routes'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}))

enum ErrorType {
  NONE = 0,
  REQUIRED = 1,
  INVALID = 2,
}

interface ErrorState {
  username: ErrorType
  password: ErrorType
}

const initialErrorState: ErrorState = {
  username: ErrorType.NONE,
  password: ErrorType.NONE,
}

export default function SignInCard() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [errors, setErrors] = useState(initialErrorState)
  const [remember, setRemember] = useState(true)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const username = (data.get('name') as string)?.trim() || ''
    const password = (data.get('password') as string)?.trim() || ''

    const newErrors: ErrorState = {
      username: username === '' ? ErrorType.REQUIRED : errors.username,
      password: password === '' ? ErrorType.REQUIRED : errors.password,
    }

    setErrors(newErrors)

    if (
      newErrors.username === ErrorType.REQUIRED ||
      newErrors.password === ErrorType.REQUIRED
    )
      return

    const credential = { username, password }
    try {
      await createSession(credential, !remember)
      setErrors(initialErrorState)
      navigate(PrivateRoutes.Private, { replace: true })
    } catch (error) {
      setErrors({
        username: ErrorType.INVALID,
        password: ErrorType.INVALID,
      })
    }
  }

  const getErrorMessage = (
    field: keyof ErrorState,
    messages: { required: string; invalid: string }
  ) => {
    const error = errors[field]
    if (error === ErrorType.NONE) return ''
    if (error === ErrorType.REQUIRED) return messages.required
    return messages.invalid
  }

  const usernameErrorMessage = getErrorMessage('username', {
    required: t('login.nameRequired'),
    invalid: t('login.invalid'),
  })

  const passwordErrorMessage = getErrorMessage('password', {
    required: t('login.passwordRequired'),
    invalid: t('login.invalid'),
  })

  return (
    <Card variant='outlined'>
      {/* Heading */}
      <Typography
        component='h1'
        variant='h4'
        sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
        {t('login.title')}
      </Typography>

      {/* Form */}
      <Box
        component='form'
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* username */}
        <FormControl>
          <FormLabel htmlFor='name'>{t('login.name')}</FormLabel>
          <TextField
            id='name'
            name='name'
            placeholder={t('login.namePlaceholder')}
            autoComplete='name'
            autoFocus
            required
            fullWidth
            variant='outlined'
            error={errors.username !== ErrorType.NONE}
            helperText={usernameErrorMessage}
          />
        </FormControl>

        {/* password */}
        <FormControl>
          <FormLabel htmlFor='password'>{t('login.password')}</FormLabel>
          <TextField
            id='password'
            name='password'
            type='password'
            placeholder='••••••'
            autoComplete='current-password'
            required
            fullWidth
            variant='outlined'
            error={errors.password !== ErrorType.NONE}
            helperText={passwordErrorMessage}
          />
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              value='remember'
              color='primary'
            />
          }
          label={t('login.remember')}
        />
        <Button type='submit' fullWidth variant='contained'>
          {t('login.login')}
        </Button>
      </Box>
    </Card>
  )
}
