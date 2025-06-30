import {
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material'
import { DefaultFilter } from '@/models/defaultfilter.model'
import { RefObject, useState } from 'react'
import { GridApiCommunity } from '@mui/x-data-grid/internals'
import { useTranslation } from 'react-i18next'

interface FilterComponentProps {
  defaultFilters?: DefaultFilter[]
  apiRef: RefObject<GridApiCommunity | null>
}

export const FilterComponent: React.FC<FilterComponentProps> = ({
  defaultFilters,
  apiRef,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { t } = useTranslation()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box
      display='grid'
      gridTemplateColumns='repeat(auto-fill, minmax(180px, 1fr))'
      gap={2}
      pl={2}
      pr={2}>
      {defaultFilters && !isSmallScreen ? (
        defaultFilters.map(({ label, filterModel }) => (
          <Button
            key={label}
            variant='outlined'
            sx={{ color: 'text.primary' }}
            onClick={() => apiRef.current?.setFilterModel(filterModel)}>
            {label}
          </Button>
        ))
      ) : (
        <div>
          <Button
            variant='outlined'
            sx={{ color: 'text.primary' }}
            onClick={handleClick}>
            {t('globals.grid.toolbarFilters')}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            {defaultFilters?.map(({ label, filterModel }) => (
              <MenuItem
                key={label}
                onClick={() => {
                  apiRef.current?.setFilterModel(filterModel)
                  handleClose()
                }}>
                {label}
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}
    </Box>
  )
}

export default FilterComponent
