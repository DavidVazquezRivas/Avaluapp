import React, { useMemo, useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { useTranslation } from 'react-i18next'
import { blue, red } from '@mui/material/colors'
import { BaseGraphicCard } from './BaseGraphicCard'
import { NumericAnswer } from './types'

interface BoxPlotProps {
  data: NumericAnswer[]
  title?: string
}

export const BoxPlot: React.FC<BoxPlotProps> = ({ data, title }) => {
  const { t } = useTranslation()
  const svgRef = useRef<SVGSVGElement>(null)

  const boxPlotData = useMemo(() => {
    if (data.length === 0) return null

    const values = data.map((d) => Number(d.value)).sort((a, b) => a - b)
    const n = values.length

    const q1Index = Math.floor(n * 0.25)
    const q3Index = Math.floor(n * 0.75)
    const medianIndex = Math.floor(n * 0.5)

    const q1 = values[q1Index]
    const q3 = values[q3Index]
    const median =
      n % 2 === 0
        ? (values[medianIndex - 1] + values[medianIndex]) / 2
        : values[medianIndex]

    const iqr = q3 - q1
    const lowerFence = q1 - 1.5 * iqr
    const upperFence = q3 + 1.5 * iqr

    const outliers = values.filter((v) => v < lowerFence || v > upperFence)
    const min = Math.max(values[0], lowerFence)
    const max = Math.min(values[n - 1], upperFence)

    return {
      min,
      q1,
      median,
      q3,
      max,
      outliers,
      values,
    }
  }, [data])

  useEffect(() => {
    if (!svgRef.current || !boxPlotData) return

    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const margin = { top: 10, right: 10, bottom: 20, left: 40 }
    const width = 280 - margin.left - margin.right
    const height = 160 - margin.top - margin.bottom

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Y scale
    const yScale = d3
      .scaleLinear()
      .domain(
        d3.extent([...boxPlotData.values, ...boxPlotData.outliers]) as [
          number,
          number
        ]
      )
      .nice()
      .range([height, 0])

    // Y axis
    g.append('g').call(d3.axisLeft(yScale)).style('font-size', '10px')

    // X center position
    const xCenter = width / 2
    const boxWidth = Math.min(60, width * 0.4)

    // Main box
    g.append('rect')
      .attr('x', xCenter - boxWidth / 2)
      .attr('y', yScale(boxPlotData.q3))
      .attr('width', boxWidth)
      .attr('height', yScale(boxPlotData.q1) - yScale(boxPlotData.q3))
      .attr('fill', blue[100])
      .attr('stroke', blue[600])
      .attr('stroke-width', 2)
      .attr('rx', 3)

    // Median line
    g.append('line')
      .attr('x1', xCenter - boxWidth / 2)
      .attr('x2', xCenter + boxWidth / 2)
      .attr('y1', yScale(boxPlotData.median))
      .attr('y2', yScale(boxPlotData.median))
      .attr('stroke', blue[800])
      .attr('stroke-width', 2)

    // Whiskers
    g.append('line')
      .attr('x1', xCenter)
      .attr('x2', xCenter)
      .attr('y1', yScale(boxPlotData.q3))
      .attr('y2', yScale(boxPlotData.max))
      .attr('stroke', blue[600])
      .attr('stroke-width', 1)

    g.append('line')
      .attr('x1', xCenter - boxWidth / 4)
      .attr('x2', xCenter + boxWidth / 4)
      .attr('y1', yScale(boxPlotData.max))
      .attr('y2', yScale(boxPlotData.max))
      .attr('stroke', blue[600])
      .attr('stroke-width', 1)

    g.append('line')
      .attr('x1', xCenter)
      .attr('x2', xCenter)
      .attr('y1', yScale(boxPlotData.q1))
      .attr('y2', yScale(boxPlotData.min))
      .attr('stroke', blue[600])
      .attr('stroke-width', 1)

    g.append('line')
      .attr('x1', xCenter - boxWidth / 4)
      .attr('x2', xCenter + boxWidth / 4)
      .attr('y1', yScale(boxPlotData.min))
      .attr('y2', yScale(boxPlotData.min))
      .attr('stroke', blue[600])
      .attr('stroke-width', 1)

    // Outliers
    g.selectAll('.outlier')
      .data(boxPlotData.outliers)
      .enter()
      .append('circle')
      .attr('class', 'outlier')
      .attr('cx', xCenter)
      .attr('cy', (d) => yScale(d))
      .attr('r', 2)
      .attr('fill', red[500])
      .attr('stroke', red[700])
      .attr('stroke-width', 1)
  }, [boxPlotData])

  if (!boxPlotData) {
    return (
      <BaseGraphicCard title={title || t('globals.graphics.boxPlot.title')}>
        <div>{t('globals.graphics.noNumericData')}</div>
      </BaseGraphicCard>
    )
  }

  return (
    <BaseGraphicCard title={title || t('globals.graphics.boxPlot.title')}>
      <svg
        ref={svgRef}
        width={300}
        height={180}
        style={{ overflow: 'visible' }}
      />
    </BaseGraphicCard>
  )
}
