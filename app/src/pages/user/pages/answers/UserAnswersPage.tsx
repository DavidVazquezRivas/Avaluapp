import Layout from '@/components/layout/Layout'
import {
  Typography,
  Stack,
  Card,
  CardContent,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import LoadingSpinner from '@/components/spinner/Spinner'
import getUserAnswersQueryOptions from './queries/get.user.answers.query'
import { DynamicResults } from '@/components/results'
import { Result } from '@/models/answer.model'
import { tagRenderer } from '@/utils/renderers/tag.renderer'

export const UserAnswersPage = () => {
  const { t } = useTranslation()
  const [hasSearched, setHasSearched] = useState(false)
  const { data, isLoading, isError, refetch } = useQuery(
    getUserAnswersQueryOptions(hasSearched)
  )

  const handleSearch = () => {
    setHasSearched(true)
    if (hasSearched) {
      refetch()
    }
  }

  if (isLoading) return <LoadingSpinner />

  if (isError) {
    return (
      <Layout align='start'>
        <Typography color='error' textAlign='center' mt={4}>
          {t('user.answers.error')}
        </Typography>
      </Layout>
    )
  }

  return (
    <Layout align='start'>
      <Box sx={{ mb: 3 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          {t('user.answers.title')}
        </Typography>

        <Button
          variant='contained'
          startIcon={<SearchIcon />}
          onClick={handleSearch}
          sx={{ mb: 2 }}>
          {t('admin.projectdetail.tabs.results.filters.search')}
        </Button>
      </Box>

      {!hasSearched ? (
        <Card>
          <CardContent>
            <Typography
              fontSize='1.25rem'
              display='flex'
              justifyContent='center'
              textAlign='center'>
              {t('user.answers.searchPrompt')}
            </Typography>
          </CardContent>
        </Card>
      ) : !data || (Array.isArray(data) && data.length === 0) ? (
        <Card>
          <CardContent>
            <Typography
              fontSize='1.25rem'
              display='flex'
              justifyContent='center'
              textAlign='center'
              mt={4}>
              {t('user.answers.empty')}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={3}>
          {Array.isArray(data) &&
            data.map((surveyItem: any, index: number) => (
              <Accordion
                key={surveyItem.survey?.id || index}
                variant='outlined'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${
                    surveyItem.survey?.id || index
                  }-content`}
                  id={`panel-${surveyItem.survey?.id || index}-header`}
                  sx={{
                    backgroundColor: `${
                      surveyItem.survey?.tag?.color || '#1976d2'
                    }20`,
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
                        {surveyItem.survey?.name ||
                          t('user.answers.unknownSurvey')}
                      </Typography>
                      <Box display='flex' alignItems='center'>
                        <Typography
                          variant='caption'
                          color='text.secondary'
                          mr={1}>
                          {t('user.answers.project')}
                        </Typography>
                        <Typography variant='caption'>
                          {surveyItem.survey?.project?.name ||
                            surveyItem.survey?.admin?.username ||
                            t('user.answers.unknownProject')}
                        </Typography>
                      </Box>
                    </Box>
                    {surveyItem.survey?.tag &&
                      tagRenderer(surveyItem.survey.tag)}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    {surveyItem.answers?.map(
                      (result: Result, answerIndex: number) => (
                        <Card key={answerIndex} variant='outlined'>
                          <CardContent>
                            <DynamicResults result={result} />
                          </CardContent>
                        </Card>
                      )
                    )}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
        </Stack>
      )}
    </Layout>
  )
}

export default UserAnswersPage
