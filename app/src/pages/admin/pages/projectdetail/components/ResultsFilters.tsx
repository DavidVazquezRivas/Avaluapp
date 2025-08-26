import { ResultsFilters as ResultsFiltersModel } from '@/models/results.model'
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  OutlinedInput,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import getAllTagsQueryOptions from '../queries/tag/getAll.tag.query'
import getAllSurveysQueryOptions from '../queries/survey/getAll.survey.query'
import { tagRenderer } from '@/utils/renderers/tag.renderer'
import { Tag } from '@/models/tag.model'
import { Survey } from '@/models/survey.model'

interface ResultsFiltersProps {
  filters: ResultsFiltersModel
  onSearch: (filters: ResultsFiltersModel) => void
  projectId: number
}

export const ResultsFilters: React.FC<ResultsFiltersProps> = ({
  filters,
  onSearch,
  projectId,
}) => {
  const { t } = useTranslation()

  // Local state for managing current selections and filter type
  const [filterType, setFilterType] = useState<string>(filters.filterType || '')
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
    filters.tagIds || []
  )
  const [selectedSurveyIds, setSelectedSurveyIds] = useState<number[]>(
    filters.surveyIds || []
  )

  // Fetch tags and surveys data
  const { data: tagsData, isFetching: isTagsFetching } = useQuery(
    getAllTagsQueryOptions(projectId)
  )

  const { data: surveysData, isFetching: isSurveysFetching } = useQuery(
    getAllSurveysQueryOptions(projectId)
  )

  // Sync local state when filters change from parent
  useEffect(() => {
    setFilterType(filters.filterType || '')
    setSelectedTagIds(filters.tagIds || [])
    setSelectedSurveyIds(filters.surveyIds || [])
  }, [filters])

  const handleFilterTypeChange = (value: string) => {
    // Update local filter type
    setFilterType(value)

    // Reset selections when changing filter type
    setSelectedTagIds([])
    setSelectedSurveyIds([])

    // Don't search immediately, let the user click the search button
    // The search will happen when they click the "Buscar" button
  }

  const handleTagsChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value
    const newSelectedIds =
      typeof value === 'string' ? value.split(',').map(Number) : value
    setSelectedTagIds(newSelectedIds)
  }

  const handleSurveysChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value
    const newSelectedIds =
      typeof value === 'string' ? value.split(',').map(Number) : value
    setSelectedSurveyIds(newSelectedIds)
  }

  const handleSearch = () => {
    const newFilters: ResultsFiltersModel = {
      filterType: filterType,
      tagIds: filterType === 'tags' ? selectedTagIds : [],
      surveyIds: filterType === 'surveys' ? selectedSurveyIds : [],
    }
    onSearch(newFilters)
  }

  return (
    <Stack
      spacing={2}
      direction='row'
      alignItems='center'
      justifyContent='flex-end'
      mb={2}>
      {/* Tags selector */}
      {filterType === 'tags' && (
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id='tags-select-label'>
            {t('admin.projectdetail.tabs.results.filters.tags.label')}
          </InputLabel>
          <Select
            labelId='tags-select-label'
            id='tags-select'
            multiple
            value={selectedTagIds}
            onChange={handleTagsChange}
            input={
              <OutlinedInput
                label={t('admin.projectdetail.tabs.results.filters.tags.label')}
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((tagId) => {
                  const tag = tagsData?.find((t: Tag) => t.id === tagId)
                  return tag ? (
                    <span key={tagId}>{tagRenderer(tag)}</span>
                  ) : null
                })}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250,
                },
              },
            }}
            disabled={isTagsFetching}>
            {tagsData?.map((tag: Tag) => (
              <MenuItem key={tag.id} value={tag.id} sx={{ my: 0.5 }}>
                <Checkbox checked={selectedTagIds.indexOf(tag.id) > -1} />
                <ListItemText
                  primary={
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      {tagRenderer(tag)}
                    </span>
                  }
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Surveys selector */}
      {filterType === 'surveys' && (
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id='surveys-select-label'>
            {t('admin.projectdetail.tabs.results.filters.surveys.label')}
          </InputLabel>
          <Select
            labelId='surveys-select-label'
            id='surveys-select'
            multiple
            value={selectedSurveyIds}
            onChange={handleSurveysChange}
            input={
              <OutlinedInput
                label={t(
                  'admin.projectdetail.tabs.results.filters.surveys.label'
                )}
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((surveyId) => {
                  const survey = surveysData?.find(
                    (s: Survey) => s.id === surveyId
                  )
                  return survey ? (
                    <span
                      key={surveyId}
                      style={{
                        backgroundColor: '#e3f2fd',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        color: '#1976d2',
                      }}>
                      {survey.name}
                    </span>
                  ) : null
                })}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250,
                },
              },
            }}
            disabled={isSurveysFetching}>
            {surveysData?.map((survey: Survey) => (
              <MenuItem key={survey.id} value={survey.id} sx={{ my: 0.5 }}>
                <Checkbox checked={selectedSurveyIds.indexOf(survey.id) > -1} />
                <ListItemText primary={survey.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id='filter-type-label'>
          {t('admin.projectdetail.tabs.results.filters.type.label')}
        </InputLabel>
        <Select
          labelId='filter-type-label'
          id='filter-type-select'
          value={filterType}
          label={t('admin.projectdetail.tabs.results.filters.type.label')}
          onChange={(e) => handleFilterTypeChange(e.target.value)}>
          <MenuItem value='none'>
            {t('admin.projectdetail.tabs.results.filters.type.none')}
          </MenuItem>
          <MenuItem value='tags'>
            {t('admin.projectdetail.tabs.results.filters.type.tags')}
          </MenuItem>
          <MenuItem value='surveys'>
            {t('admin.projectdetail.tabs.results.filters.type.surveys')}
          </MenuItem>
        </Select>
      </FormControl>

      <Button variant='contained' onClick={handleSearch}>
        {t('admin.projectdetail.tabs.results.filters.search')}
      </Button>
    </Stack>
  )
}
