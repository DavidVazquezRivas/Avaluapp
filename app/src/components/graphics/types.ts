import { BaseAnswer } from '@/models/answer.model'

export interface NumericAnswer extends Omit<BaseAnswer, 'value'> {
  answer: number
}

export interface TimelineData {
  date: Date
  count: number
}

export interface PieChartData {
  label: string
  value: number
  count: number
}

export interface BarChartData {
  label: string
  value: number
  order?: number
}

export interface BoxPlotData {
  min: number
  q1: number
  median: number
  q3: number
  max: number
  outliers?: number[]
}
