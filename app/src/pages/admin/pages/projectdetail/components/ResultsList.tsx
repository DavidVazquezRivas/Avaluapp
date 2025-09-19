import { ResultsFilters } from '@/models/results.model'
import { useProjectAnswers } from '../hooks/useProjectAnswers'
import LoadingSpinner from '@/components/spinner/Spinner'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Stack,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Result } from '@/models/answer.model'
import { DynamicResults } from '@/components/results'
import { tagRenderer } from '@/utils/renderers/tag.renderer'
import { useTranslation } from 'react-i18next'

interface ResultsListProps {
  filters: ResultsFilters
  query: ReturnType<typeof useProjectAnswers>
}

export const ResultsList: React.FC<ResultsListProps> = ({ filters, query }) => {
  const { t } = useTranslation()
  const { data, isLoading } = query

  if (isLoading) return <LoadingSpinner />

  // Calculate results count based on filter type
  const getResultsCount = () => {
    if (!data || !Array.isArray(data)) return 0
    return data.length
  }

  const resultsCount = getResultsCount()

  if (!data || (Array.isArray(data) && data.length === 0))
    return (
      <Typography
        fontSize='1.25rem'
        display='flex'
        justifyContent='center'
        mt={4}>
        {t('admin.projectdetail.tabs.results.list.empty')}
      </Typography>
    )

  return (
    <Stack spacing={4}>
      {/* Results count display */}
      <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
        {t(
          `admin.projectdetail.tabs.results.list.resultsCount.${filters.filterType}`,
          { count: resultsCount }
        )}
      </Typography>

      {filters.filterType === 'none' && Array.isArray(data) && (
        <SimpleResultList data={data} />
      )}
      {filters.filterType === 'tags' && Array.isArray(data) && (
        <TagResultsList data={data} />
      )}
      {filters.filterType === 'surveys' && Array.isArray(data) && (
        <SurveyResultsList data={data} />
      )}
    </Stack>
  )
}

interface SimpleResultListProps {
  data: Result[]
}

const SimpleResultList: React.FC<SimpleResultListProps> = ({ data }) => {
  return (
    <Stack spacing={2}>
      {data.map((item, index) => (
        <DynamicResults key={index} result={item} />
      ))}
    </Stack>
  )
}

interface TagResultsListProps {
  data: any[] // TODO: Define types properly
}

const TagResultsList: React.FC<TagResultsListProps> = ({ data }) => {
  return (
    <Stack spacing={2}>
      {data.map((tagItem, index) => (
        <Accordion key={tagItem.tag?.id} defaultExpanded={index === 0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${tagItem.tag?.id}-content`}
            id={`panel-${tagItem.tag?.id}-header`}
            sx={{
              backgroundColor: `${tagItem.tag?.color}20`,
            }}>
            {tagRenderer(tagItem.tag)}
          </AccordionSummary>
          <AccordionDetails>
            <SimpleResultList data={tagItem.answers} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  )
}

interface SurveyResultsListProps {
  data: any[] // TODO: Define types properly
}

const SurveyResultsList: React.FC<SurveyResultsListProps> = ({ data }) => {
  const { t } = useTranslation()
  return (
    <Stack spacing={3}>
      {data.map((surveyItem, index) => (
        <Accordion key={surveyItem.survey?.id} defaultExpanded={index === 0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${surveyItem.survey?.id}-content`}
            id={`panel-${surveyItem.survey?.id}-header`}
            sx={{
              backgroundColor: `${surveyItem.survey.tag.color}20`,
            }}>
            <Box
              display='flex'
              flexDirection='row'
              width='100%'
              alignItems='center'
              justifyContent='space-between'>
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                width='100%'
                mt={0.5}>
                <Typography variant='subtitle1' fontWeight='bold'>
                  {surveyItem.survey?.name}
                </Typography>
                <Box display='flex' alignItems='center'>
                  <Typography variant='caption' color='text.secondary' mr={1}>
                    {t('admin.projectdetail.tabs.results.list.responsible')}
                  </Typography>
                  <Typography variant='caption'>
                    {surveyItem.survey?.lead?.username}
                  </Typography>
                </Box>
              </Box>
              {tagRenderer(surveyItem.survey.tag)}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <SimpleResultList data={surveyItem.answers} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  )
}
