import React from 'react'
import { BaseGraphicCard } from './BaseGraphicCard'
import { Typography, Box } from '@mui/material'
import { blue, green, orange, red } from '@mui/material/colors'

interface NumberDisplayProps {
  value: number
  title?: string
  variant?: 'primary' | 'success' | 'warning' | 'error'
}

export const NumberDisplay: React.FC<NumberDisplayProps> = ({
  value,
  title,
  variant = 'primary',
}) => {
  const formatNumber = (num: number) => {
    if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    if (num % 1 === 0) return num.toString()
    return num.toFixed(2)
  }

  const getColor = () => {
    switch (variant) {
      case 'success':
        return green[600]
      case 'warning':
        return orange[600]
      case 'error':
        return red[600]
      default:
        return blue[600]
    }
  }

  return (
    <BaseGraphicCard width={190}>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        height='160px'
        gap={1}>
        <Typography
          variant='h2'
          component='div'
          sx={{
            color: getColor(),
            fontWeight: 700,
            fontSize: '3rem',
            textAlign: 'center',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}>
          {formatNumber(value)}
        </Typography>
        {title && (
          <Typography
            variant='body2'
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textAlign: 'center',
            }}>
            {title}
          </Typography>
        )}
      </Box>
    </BaseGraphicCard>
  )
}
