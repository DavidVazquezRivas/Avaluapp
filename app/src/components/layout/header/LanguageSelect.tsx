import { Languages } from '@/constants/languages'
import i18n from '@/translation/i18n'
import {
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { CircleFlagLanguage } from 'react-circle-flags'
import { useTranslation } from 'react-i18next'
import * as React from 'react'

export const LanguageIconDropdown = () => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = async (languageCode: string) => {
    await i18n.changeLanguage(languageCode)
    handleClose()
  }

  const currentLanguage = i18n.resolvedLanguage || Languages[0].code

  const options = Languages.map((language) => (
    <MenuItem
      key={language.code}
      onClick={() => handleLanguageChange(language.code)}
      selected={language.code === i18n.resolvedLanguage}>
      <CircleFlagLanguage
        languageCode={language.code}
        style={{
          width: '20px',
          height: '20px',
          marginRight: '8px',
        }}
      />
      {t(`globals.header.language.${language.code}`)}
    </MenuItem>
  ))

  return (
    <>
      <IconButton
        onClick={handleClick}
        size={isSmallScreen ? 'medium' : 'small'}
        sx={{ color: 'text.primary' }}
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}>
        <CircleFlagLanguage
          languageCode={currentLanguage}
          style={{ width: '20px', height: '20px' }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        slotProps={{
          paper: {
            variant: 'outlined',
            elevation: 0,
            sx: {
              my: '4px',
            },
          },
        }}>
        {options}
      </Menu>
    </>
  )
}

export default LanguageIconDropdown
