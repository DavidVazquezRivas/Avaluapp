import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'

interface BaseGraphicCardProps {
  title?: string
  children: React.ReactNode
  width?: number
  height?: number
}

export const BaseGraphicCard: React.FC<BaseGraphicCardProps> = ({
  title,
  children,
  width = 400,
  height = 250,
}) => {
  return (
    <Card
      sx={{
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 1,
        borderRadius: 2,
      }}>
      {title && (
        <Box sx={{ p: 1, pb: 0, flexShrink: 0 }}>
          <Typography
            variant='h6'
            component='h3'
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              fontSize: '0.9rem',
            }}>
            {title}
          </Typography>
        </Box>
      )}
      <CardContent
        sx={{
          p: 1,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
        {children}
      </CardContent>
    </Card>
  )
}
