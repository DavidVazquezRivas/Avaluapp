import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavItem } from '@/models/nav.model'

interface MobileNavigationProps {
  open: boolean
  onClose: () => void
  navItems: NavItem[]
  haveSession: boolean
  onLogout: () => void
  isLoadingProjects?: boolean
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  open,
  onClose,
  navItems,
  haveSession,
  onLogout,
  isLoadingProjects = false,
}) => {
  const [collapseOpen, setCollapseOpen] = React.useState<
    Record<string, boolean>
  >({})
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleCollapseToggle = (key: string) => {
    setCollapseOpen((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Drawer
      anchor='top'
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { top: 'var(--template-frame-height, 0px)' } }}>
      <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={onClose}>
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
                        {subItem.unlocated
                          ? subItem.value
                          : t(`globals.header.navs.${subItem.value}`)}
                      </ListItemButton>
                    ))}
                    {item.value === 'projects.title' && isLoadingProjects && (
                      <ListItemButton sx={{ pl: 4 }} disabled>
                        <CircularProgress size={16} sx={{ mr: 1 }} />
                        {t('globals.loading', 'Cargando...')}
                      </ListItemButton>
                    )}
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
              onClick={onLogout}>
              {t('globals.header.logout')}
            </Button>
          </MenuItem>
        )}
      </Box>
    </Drawer>
  )
}
