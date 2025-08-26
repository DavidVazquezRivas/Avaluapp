import { Tag } from '@/models/tag.model'
import { Box } from '@mui/material'
import { getContrastingTextColor } from '../color.utils'

export const tagRenderer = (tag: Tag) => {
  const textColor = getContrastingTextColor(tag.color)
  return (
    <Box
      component='span'
      height='32px'
      display='flex'
      alignItems='center'
      borderRadius={1.5}
      py={0}
      px={2}
      sx={{
        backgroundColor: tag.color,
        color: textColor,
        whiteSpace: 'nowrap',
      }}>
      {tag.name}
    </Box>
  )
}
