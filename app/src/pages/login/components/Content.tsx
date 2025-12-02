import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import PollRoundedIcon from '@mui/icons-material/PollRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import { Icon } from '@/assets/Icon'
import { useTranslation } from 'react-i18next'

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL

export default function Content() {
  const { t } = useTranslation()

  const items = [
    {
      icon: <PollRoundedIcon sx={{ color: 'text.secondary' }} />,
      title: t('login.content.features.surveys.title'),
      description: t('login.content.features.surveys.description'),
    },
    {
      icon: <GroupsRoundedIcon sx={{ color: 'text.secondary' }} />,
      title: t('login.content.features.roles.title'),
      description: t('login.content.features.roles.description'),
    },
    {
      icon: <ShareRoundedIcon sx={{ color: 'text.secondary' }} />,
      title: t('login.content.features.distribution.title'),
      description: t('login.content.features.distribution.description'),
    },
    {
      icon: <InsightsRoundedIcon sx={{ color: 'text.secondary' }} />,
      title: t('login.content.features.analytics.title'),
      description: t('login.content.features.analytics.description'),
    },
  ]

  return (
    <Stack
      sx={{
        flexDirection: 'column',
        alignSelf: 'center',
        gap: 4,
        maxWidth: 450,
        display: { xs: 'none', md: 'flex' },
      }}>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Icon />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction='row' sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
      {contactEmail && (
        <Stack direction='row' sx={{ gap: 2, mt: 2 }}>
          <EmailRoundedIcon sx={{ color: 'text.secondary' }} />
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {t('login.content.contact.title')}
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              {t('login.content.contact.description')}{' '}
              <Link
                href={`mailto:${contactEmail}`}
                underline='hover'
                sx={{
                  color: 'primary.main',
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}>
                {contactEmail}
              </Link>
            </Typography>
          </div>
        </Stack>
      )}
    </Stack>
  )
}
