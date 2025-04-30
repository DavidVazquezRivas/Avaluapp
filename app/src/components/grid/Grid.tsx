import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SIZE_OPTIONS,
} from '@/constants/grid.constants'
import { useGridLocaleText } from '@/hooks/useGridLocaleText'
import { DefaultFilter } from '@/models/defaultfilter.model'
import { Button, Stack } from '@mui/material'
import { DataGrid, DataGridProps, useGridApiRef } from '@mui/x-data-grid'

interface GridProps extends DataGridProps {
  defaultFilters?: DefaultFilter[]
}

export const Grid: React.FC<GridProps> = ({ defaultFilters, ...props }) => {
  const apiRef = useGridApiRef()
  const localeText = useGridLocaleText()

  return (
    <Stack direction='column' spacing={2} width='100%' height='100%'>
      <Stack direction='row' spacing={2} pl={2} pr={2}>
        {defaultFilters &&
          defaultFilters.map(({ label, filterModel }) => {
            return (
              <Button
                key={label}
                variant='outlined'
                sx={{ color: 'text.primary' }}
                onClick={() => apiRef.current?.setFilterModel(filterModel)}>
                {label}
              </Button>
            )
          })}
      </Stack>

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
