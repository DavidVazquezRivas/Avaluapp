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

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL

const items = [
  {
    icon: <PollRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Diseña encuestas',
    description: 'Crea encuestas personalizadas con diferentes tipos de preguntas.',
  },
  {
    icon: <GroupsRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Gestión por roles',
    description: 'Los administradores diseñan el contenido mientras los usuarios gestionan la distribución.',
  },
  {
    icon: <ShareRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Distribución sencilla',
    description:
      'Genera enlaces públicos únicos para compartir encuestas. Los participantes responden sin necesidad de registrarse.',
  },
  {
    icon: <InsightsRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Analiza resultados',
    description:
      'Visualiza respuestas agregadas, filtra por etiquetas y genera informes detallados para tomar decisiones basadas en datos.',
  },
]

export default function Content() {
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
              ¿Necesitas acceso?
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Contacta con el administrador en{' '}
              <Link href={`mailto:${contactEmail}`} underline='hover'>
                {contactEmail}
              </Link>
            </Typography>
          </div>
        </Stack>
      )}
    </Stack>
  )
}
