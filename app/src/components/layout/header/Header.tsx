import * as React from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import MenuIcon from '@mui/icons-material/Menu'
import ColorModeIconDropdown from '@/theme/ColorModeIconDropdown'
import LanguageSelect from './LanguageSelect'
import { NavButtons } from './NavButtons'
import { MobileNavigation } from './MobileNavigation'
import { styled, alpha } from '@mui/material/styles'
import { Icon } from '@/assets/Icon'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSession } from '@/hooks/useSession'
import { useNavItems } from '@/hooks/useNavItems'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.default
    ? `rgba(${theme.palette.background.default} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}))

export default function Header() {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { haveSession, deleteSession } = useSession()
  const { navItems, isLoadingProjects } = useNavItems()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const handleLogout = async () => {
    await deleteSession()
    navigate('/', { replace: true })
  }

  return (
    <AppBar
      position='fixed'
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}>
      <Container maxWidth='lg'>
        <StyledToolbar variant='dense' disableGutters>
          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Icon />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <NavButtons
                navItems={navItems}
                isLoadingProjects={isLoadingProjects}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}>
            {haveSession && (
              <Button
                color='primary'
                variant='text'
                size='small'
                onClick={handleLogout}>
                {t('globals.header.logout')}
              </Button>
            )}
            <LanguageSelect />
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <LanguageSelect />
            <ColorModeIconDropdown size='medium' />
            <IconButton aria-label='Menu button' onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: 'text.primary' }} />
            </IconButton>
            <MobileNavigation
              open={open}
              onClose={toggleDrawer(false)}
              navItems={navItems}
              haveSession={haveSession}
              onLogout={handleLogout}
              isLoadingProjects={isLoadingProjects}
            />
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  )
}
