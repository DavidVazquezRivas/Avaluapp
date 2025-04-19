import * as React from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ColorModeIconDropdown from '@/theme/ColorModeIconDropdown'
import { styled, alpha } from '@mui/material/styles'
import { Icon } from '@/assets/Icon'
import { deleteSession, getSession, haveSession } from '@/utils/session.utils'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Role } from '@/models/role.model'
import { AdminNavs, UserNavs } from '@/constants/navs'
import { NavItem } from '@/models/nav.model'
import LanguageSelect from './LanguageSelect'

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

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const handleLogout = async () => {
    await deleteSession()
    navigate('/', { replace: true })
  }

  const isLoggedIn = haveSession()

  const navButtons = getNavItems().map((item: NavItem) => (
    <Button
      key={item.value}
      variant='text'
      color='info'
      size='small'
      onClick={() => navigate(item.href, { replace: true })}>
      {t(`globals.header.navs.${item.value}`)}
    </Button>
  ))

  const navMenuItems = getNavItems().map((item: NavItem) => (
    <MenuItem
      key={item.value}
      onClick={() => navigate(item.href, { replace: true })}>
      {t(`globals.header.navs.${item.value}`)}
    </MenuItem>
  ))

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
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>{navButtons}</Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}>
            {isLoggedIn && (
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
            <Drawer
              anchor='top'
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon sx={{ color: 'text.primary' }} />
                  </IconButton>
                </Box>

                {navMenuItems}
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  {isLoggedIn && (
                    <Button
                      fullWidth
                      color='primary'
                      variant='contained'
                      onClick={handleLogout}>
                      {t('globals.header.logout')}
                    </Button>
                  )}
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  )
}

function getNavItems(): NavItem[] {
  const session = getSession()
  switch (session?.user?.role) {
    case Role.Admin:
      return AdminNavs
    case Role.User:
      return UserNavs
    default:
      return []
  }
}
