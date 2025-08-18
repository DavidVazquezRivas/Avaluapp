import React, { useMemo } from 'react'
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart'
import { useTranslation } from 'react-i18next'
import {
  blue,
  red,
  orange,
  green,
  purple,
  teal,
  brown,
  grey,
} from '@mui/material/colors'
import { Box, Tooltip } from '@mui/material'
import { BaseGraphicCard } from './BaseGraphicCard'
import { BaseAnswer } from '@/models/answer.model'
import { truncateText } from '@/utils/text.utils'

interface PieChartProps {
  data: BaseAnswer[]
  title?: string
  maxLabelLength?: number // Nuevo prop para limitar longitud de labels
  maxLegendHeight?: number // Nuevo prop para altura máxima de la leyenda
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  maxLabelLength = 15,
}) => {
  const { t } = useTranslation()

  const chartData = useMemo(() => {
    // Count frequency of each value
    const valueCount = new Map<string, number>()

    data.forEach((answer) => {
      const values = Array.isArray(answer.value) ? answer.value : [answer.value]
      values.forEach((value) => {
        valueCount.set(String(value), (valueCount.get(String(value)) || 0) + 1)
      })
    })

    // Convert to array and sort by frequency
    const sortedData = Array.from(valueCount.entries())
      .map(([label, count]) => ({
        id: label,
        label,
        value: count,
        originalLabel: label, // Guardamos la label original para tooltips
      }))
      .sort((a, b) => b.value - a.value)

    return sortedData
  }, [data])

  // MUI colors
  const colors = [
    blue[600],
    red[500],
    orange[500],
    green[600],
    purple[500],
    teal[500],
    brown[500],
    grey[600],
    blue[400],
    red[300],
  ]

  // Legend component
  const CustomLegend = ({ data }: { data: typeof chartData }) => (
    <Box
      sx={{
        maxHeight: 150,
        overflowY: 'auto',
        paddingRight: 1,
        marginLeft: 2,
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#555',
        },
      }}>
      {data.map((item, index) => (
        <Tooltip
          key={item.id}
          title={item.originalLabel !== item.label ? item.originalLabel : ''}
          placement='top'>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 1,
              cursor: item.originalLabel !== item.label ? 'help' : 'default',
            }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: colors[index % colors.length],
                marginRight: 1,
                borderRadius: '50%',
                flexShrink: 0,
              }}
            />
            <Box
              sx={{
                fontSize: '0.875rem',
                color: 'text.secondary',
                lineHeight: 1.2,
                wordBreak: 'break-word',
              }}>
              {truncateText(item.label, maxLabelLength)} ({item.value})
            </Box>
          </Box>
        </Tooltip>
      ))}
    </Box>
  )

  if (chartData.length === 0) {
    return (
      <BaseGraphicCard title={title || t('globals.graphics.pieChart.title')}>
        <div>{t('globals.graphics.noData')}</div>
      </BaseGraphicCard>
    )
  }

  return (
    <BaseGraphicCard title={title || t('globals.graphics.pieChart.title')}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* Pie chart */}
        <Box sx={{ flexShrink: 0 }}>
          <MuiPieChart
            series={[
              {
                data: chartData.map((item, index) => ({
                  id: item.id,
                  value: item.value,
                  label: '', // Removemos labels del gráfico
                  color: colors[index % colors.length],
                })),
                innerRadius: 15,
                outerRadius: 70,
                paddingAngle: 2,
                cornerRadius: 4,
                cx: 90,
                cy: 90,
                highlightScope: { fade: 'global', highlight: 'item' },
              },
            ]}
            width={180}
            height={210}
            hideLegend
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <CustomLegend data={chartData} />
        </Box>
      </Box>
    </BaseGraphicCard>
  )
}
