export type ResultsFilters = {
  filterType: string
  surveyIds?: number[]
  tagIds?: number[]
}

export const DefaultResultsFilters: ResultsFilters = {
  filterType: '',
  surveyIds: [],
  tagIds: [],
}
