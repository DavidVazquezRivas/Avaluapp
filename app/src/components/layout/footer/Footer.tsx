import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { socialMedias } from '@/constants/socialMedias'
import { Attribution } from '@/models/attribution.model'

function Copyright() {
  return (
    <Typography variant='body2' sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color='text.secondary' href='https://www.uib.cat/'>
        UIB
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  )
}

const mediaButtons = socialMedias.map((media) => (
  <IconButton
    key={media.name}
    color='inherit'
    size='small'
    href={media.link}
    aria-label={media.name}
    sx={{ alignSelf: 'center', color: 'text.primary' }}>
    {<media.icon />}
  </IconButton>
))

interface FooterProps {
  attributions?: Attribution[]
}

export default function Footer({ attributions }: FooterProps) {
  const attributionsList = attributions?.map((attribution) => (
    <Typography variant='body2' sx={{ color: 'text.secondary', mt: 1 }}>
      <Link color='text.secondary' href={attribution.url}>
        {attribution.text}
      </Link>
    </Typography>
  ))

  return (
    <Container
      maxWidth='lg'
      component='footer'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 2, sm: 4 },
        textAlign: { sm: 'center', md: 'left' },
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 2, sm: 4 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}>
        <Stack direction='column' spacing={1} useFlexGap>
          <Copyright />
          {attributionsList}
        </Stack>
        <Stack
          direction='row'
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: 'text.primary' }}>
          {mediaButtons}
        </Stack>
      </Box>
    </Container>
  )
}
