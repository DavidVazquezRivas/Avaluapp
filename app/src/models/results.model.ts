export type ResultsFilters = {
  filterType: string
  surveyIds?: number[]
  tagIds?: number[]
}

export const DefaultResultsFilters: ResultsFilters = {
  filterType: 'none',
  surveyIds: [],
  tagIds: [],
}
