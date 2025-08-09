import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FormHelperText from '@mui/material/FormHelperText'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import SecurityIcon from '@mui/icons-material/Security'
import Layout from '@/components/layout/Layout'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import verifyUserQueryOptions from './queries/verify.user.query'
import { VerifyRequest } from '@/models/user.model'
import { useNavigate } from 'react-router-dom'

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

const SecurityIconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  color: theme.palette.primary.main,
}))

interface FormErrors {
  newPassword?: string
  confirmPassword?: string
}

const Verify = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()
  const navigate = useNavigate()

  const verifyMutation = useMutation(verifyUserQueryOptions(navigate))

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!newPassword) {
      newErrors.newPassword = t('verify.form.errors.newPasswordRequired')
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = t(
        'verify.form.errors.confirmPasswordRequired'
      )
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t('verify.form.errors.passwordsDoNotMatch')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const request: VerifyRequest = {
        password: newPassword,
      }
      await verifyMutation.mutateAsync(request)
    } catch (error) {
      setErrors({ newPassword: t('verify.form.errors.verificationFailed') })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setNewPassword(value)

    if (errors.newPassword) {
      setErrors((prev) => ({ ...prev, newPassword: undefined }))
    }
  }

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    setConfirmPassword(value)

    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }))
    }
  }

  return (
    <Layout>
      <Stack
        direction='column'
        component='main'
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
            minHeight: '100%',
          },
          (theme) => ({
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: -1,
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundRepeat: 'no-repeat',
              ...theme.applyStyles('dark', {
                backgroundImage:
                  'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
              }),
            },
          }),
        ]}>
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}>
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}>
            {/* Security Icon Section */}
            <SecurityIconWrapper>
              <SecurityIcon sx={{ fontSize: 120, mb: 2 }} />
              <Typography variant='h5' textAlign='center' sx={{ mb: 1 }}>
                {t('verify.flag.title')}
              </Typography>
              <Typography
                variant='body1'
                textAlign='center'
                color='text.secondary'>
                {t('verify.flag.description')}
              </Typography>
            </SecurityIconWrapper>

            {/* Password Change Form */}
            <Card variant='outlined'>
              <Typography
                component='h1'
                variant='h4'
                sx={{ fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
                {t('verify.form.title')}
              </Typography>

              <Box
                component='form'
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl error={!!errors.newPassword}>
                  <FormLabel htmlFor='newPassword'>
                    {t('verify.form.newPassword.label')}
                  </FormLabel>
                  <TextField
                    id='newPassword'
                    name='newPassword'
                    type='password'
                    placeholder={t('verify.form.newPassword.placeholder')}
                    autoComplete='new-password'
                    required
                    fullWidth
                    variant='outlined'
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    error={!!errors.newPassword}
                  />
                  {errors.newPassword && (
                    <FormHelperText>{errors.newPassword}</FormHelperText>
                  )}
                </FormControl>

                <FormControl error={!!errors.confirmPassword}>
                  <FormLabel htmlFor='confirmPassword'>
                    {t('verify.form.confirmPassword.label')}
                  </FormLabel>
                  <TextField
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    placeholder={t('verify.form.confirmPassword.placeholder')}
                    autoComplete='new-password'
                    required
                    fullWidth
                    variant='outlined'
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!!errors.confirmPassword}
                  />
                  {errors.confirmPassword && (
                    <FormHelperText>{errors.confirmPassword}</FormHelperText>
                  )}
                </FormControl>

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  disabled={isLoading}>
                  {isLoading
                    ? t('verify.form.submitting')
                    : t('verify.form.submit')}
                </Button>
              </Box>
            </Card>
          </Stack>
        </Stack>
      </Stack>
    </Layout>
  )
}

export default Verify
