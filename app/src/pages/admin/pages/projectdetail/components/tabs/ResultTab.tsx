import {
  DefaultResultsFilters,
  ResultsFilters as Filters,
} from '@/models/results.model'
import { useState } from 'react'
import { ResultsFilters } from '../ResultsFilters'
import { ResultsList } from '../ResultsList'
import { useProjectAnswers } from '../../hooks/useProjectAnswers'

interface ResultTabProps {
  projectId: number
}

export const ResultTab: React.FC<ResultTabProps> = ({ projectId }) => {
  const [filters, setFilters] = useState<Filters>(DefaultResultsFilters)
  const query = useProjectAnswers(projectId, filters)

  const handleSearch = (newFilters: Filters) => {
    setFilters(newFilters)
    // query.refetch()
  }

  return (
    <div>
      <ResultsFilters
        filters={filters}
        onSearch={handleSearch}
        projectId={projectId}
      />
      <ResultsList filters={filters} query={query} />
    </div>
  )
}

export default ResultTab
