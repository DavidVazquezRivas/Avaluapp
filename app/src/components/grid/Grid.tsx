import FilterComponent from './FiltersComponent'
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from '@/constants/grid.constants'
import { useGridLocaleText } from '@/hooks/useGridLocaleText'
import { DefaultFilter } from '@/models/defaultfilter.model'
import { Box, Button, Stack } from '@mui/material'
import { DataGrid, DataGridProps, useGridApiRef } from '@mui/x-data-grid'

interface GridProps extends DataGridProps {
  defaultFilters?: DefaultFilter[]
  createButton?: {
    label: string
    onClick: () => void
  }
}

export const Grid: React.FC<GridProps> = ({
  defaultFilters,
  createButton,
  ...props
}) => {
  const apiRef = useGridApiRef()
  const localeText = useGridLocaleText()
  const CreateButton = createButton && (
    <Button variant='contained' onClick={createButton.onClick}>
      {createButton.label}
    </Button>
  )

  return (
    <Stack direction='column' spacing={3} width='100%' height='100%'>
      <Box
        display='grid'
        gridTemplateColumns='1fr auto'
        gap={2}
        alignItems='flex-end'>
        <FilterComponent apiRef={apiRef} defaultFilters={defaultFilters} />
        {CreateButton}
      </Box>
      <DataGrid
        apiRef={apiRef}
        localeText={localeText}
        ignoreDiacritics
        disableColumnMenu
        showToolbar
        pageSizeOptions={DEFAULT_PAGE_SIZE_OPTIONS}
        initialState={
          props.initialState ?? {
            pagination: {
              paginationModel: {
                pageSize: DEFAULT_PAGE_SIZE,
              },
            },
          }
        }
        {...props}
        sx={{
          boxShadow: (theme) => theme.shadows[3],
          ...props.sx,
        }}
      />
    </Stack>
  )
}

export default Grid
