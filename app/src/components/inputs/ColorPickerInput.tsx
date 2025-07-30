import { styled } from '@mui/material'

export const ColorPickerInput = styled('input')(({ theme }) => ({
  width: '100%',
  height: '56px', // Altura similar a TextField
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}))

export default ColorPickerInput
