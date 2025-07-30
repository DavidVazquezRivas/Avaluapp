import CircleIcon from '@mui/icons-material/Circle'
import { Tooltip } from '@mui/material'

export const colorRenderer = (color: string) => {
  return (
    <Tooltip title={color}>
      <CircleIcon
        sx={{
          color: color,
          border: '1px solid #000',
          borderRadius: '50%',
          padding: '0px',
        }}
      />
    </Tooltip>
  )
}
