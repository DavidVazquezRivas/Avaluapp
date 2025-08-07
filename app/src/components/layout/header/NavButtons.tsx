import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import CircularProgress from '@mui/material/CircularProgress'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NavItem } from '@/models/nav.model'

interface NavButtonsProps {
  navItems: NavItem[]
  isLoadingProjects?: boolean
}

export const NavButtons: React.FC<NavButtonsProps> = ({
  navItems,
  isLoadingProjects = false,
}) => {
  const [anchorEls, setAnchorEls] = React.useState<
    Record<string, HTMLElement | null>
  >({})
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    key: string
  ) => {
    setAnchorEls((prev) => ({ ...prev, [key]: event.currentTarget }))
  }

  const handleMenuClose = (key: string) => {
    setAnchorEls((prev) => ({ ...prev, [key]: null }))
  }

  return (
    <>
      {navItems.map((item: NavItem) => {
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
                {item.value === 'projects.title' && isLoadingProjects && (
                  <MenuItem disabled>
                    <CircularProgress size={16} sx={{ mr: 1 }} />
                    {t('globals.loading', 'Cargando...')}
                  </MenuItem>
                )}
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
      })}
    </>
  )
}
