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
import Menu from '@mui/material/Menu'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import MenuIcon from '@mui/icons-material/Menu'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ColorModeIconDropdown from '@/theme/ColorModeIconDropdown'
import LanguageSelect from './LanguageSelect'
import store from '@/redux/store'
import { styled, alpha } from '@mui/material/styles'
import { Icon } from '@/assets/Icon'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Role } from '@/models/role.model'
import { AdminNavs, UserNavs } from '@/constants/navs'
import { NavItem } from '@/models/nav.model'
import { useSession } from '@/hooks/useSession'
import { getSession } from '@/utils/session.utils'
import { AdminRoutes } from '@/constants/routes'

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
  const [anchorEls, setAnchorEls] = React.useState<
    Record<string, HTMLElement | null>
  >({})
  const [collapseOpen, setCollapseOpen] = React.useState<
    Record<string, boolean>
  >({})
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { haveSession, deleteSession } = useSession()

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const handleLogout = async () => {
    await deleteSession()
    navigate('/', { replace: true })
  }

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    key: string
  ) => {
    setAnchorEls((prev) => ({ ...prev, [key]: event.currentTarget }))
  }

  const handleMenuClose = (key: string) => {
    setAnchorEls((prev) => ({ ...prev, [key]: null }))
  }

  const handleCollapseToggle = (key: string) => {
    setCollapseOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const navItems = getNavItems()

  const navButtons = navItems.map((item: NavItem) => {
    if (item.children?.length) {
      return (
        <React.Fragment key={item.value}>
          <Button
            color='info'
            size='small'
            onClick={(e) => handleMenuOpen(e, item.value)}
            endIcon={<ExpandMoreIcon />}>
            {t(`globals.header.navs.${item.value}`)}
          </Button>
          <Menu
            anchorEl={anchorEls[item.value]}
            open={Boolean(anchorEls[item.value])}
            onClose={() => handleMenuClose(item.value)}>
            {item.children.map((subItem) => (
              <MenuItem
                key={subItem.value}
                onClick={() => {
                  navigate(subItem.href || '/')
                  handleMenuClose(item.value)
                }}>
                {subItem.unlocated
                  ? subItem.value
                  : t(`globals.header.navs.${subItem.value}`)}
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )
    }
    return (
      <Button
        key={item.value}
        variant='text'
        color='info'
        size='small'
        onClick={() => navigate(item.href || '/', { replace: true })}>
        {t(`globals.header.navs.${item.value}`)}
      </Button>
    )
  })

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
            <Drawer
              anchor='top'
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{ sx: { top: 'var(--template-frame-height, 0px)' } }}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon sx={{ color: 'text.primary' }} />
                  </IconButton>
                </Box>
                <List>
                  {navItems.map((item) => (
                    <React.Fragment key={item.value}>
                      <ListItemButton
                        onClick={() =>
                          item.children?.length
                            ? handleCollapseToggle(item.value)
                            : navigate(item.href || '/')
                        }>
                        {t(`globals.header.navs.${item.value}`)}
                        {item.children?.length ? (
                          collapseOpen[item.value] ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )
                        ) : null}
                      </ListItemButton>
                      {item.children?.length && (
                        <Collapse
                          in={collapseOpen[item.value]}
                          timeout='auto'
                          unmountOnExit>
                          <List component='div' disablePadding>
                            {item.children.map((subItem) => (
                              <ListItemButton
                                key={subItem.value}
                                sx={{ pl: 4 }}
                                onClick={() => navigate(subItem.href || '/')}>
                                {t(`globals.header.navs.${subItem.value}`)}
                              </ListItemButton>
                            ))}
                          </List>
                        </Collapse>
                      )}
                    </React.Fragment>
                  ))}
                </List>
                <Divider sx={{ my: 3 }} />
                {haveSession && (
                  <MenuItem>
                    <Button
                      fullWidth
                      color='primary'
                      variant='contained'
                      onClick={handleLogout}>
                      {t('globals.header.logout')}
                    </Button>
                  </MenuItem>
                )}
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
      const projects = store.getState().project.projects
      const projectsNav: NavItem[] = projects.map((project) => ({
        value: project.name,
        href: `${AdminRoutes.Base}/${AdminRoutes.Projects}/${project.id}`,
        unlocated: true,
      }))

      return AdminNavs.map((nav) => {
        if (nav.value === 'projects.title') {
          return {
            ...nav,
            children: [...(nav.children || []), ...projectsNav],
          }
        }
        return nav
      })
    case Role.User:
      return UserNavs
    default:
      return []
  }
}
