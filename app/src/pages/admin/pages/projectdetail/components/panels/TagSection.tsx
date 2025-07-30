import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Checkbox,
  Box,
  OutlinedInput,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { tagRenderer } from '@/utils/renderers/tag.renderer'
import getAllTagsQueryOptions from '../../queries/tag/getAll.tag.query'
import { Tag } from '@/models/tag.model'

interface TagSectionProps {
  projectId: number
  selectedTags?: Tag[]
  onChange?: (selectedTagIds: number[]) => void
}

export const TagSection: React.FC<TagSectionProps> = ({
  projectId,
  selectedTags = [],
  onChange,
}) => {
  const { t } = useTranslation()
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])

  const { data: tagsData, isFetching: isTagsFetching } = useQuery(
    getAllTagsQueryOptions(projectId)
  )

  useEffect(() => {
    if (selectedTags.length > 0) {
      const tagIds = selectedTags.map((tag) => tag.id)
      setSelectedTagIds(tagIds)
    }
  }, [selectedTags])

  const handleTagsChange = (
    event: SelectChangeEvent<typeof selectedTagIds>
  ) => {
    const value = event.target.value
    const newSelectedIds =
      typeof value === 'string' ? value.split(',').map(Number) : value
    setSelectedTagIds(newSelectedIds)
    onChange?.(newSelectedIds)
  }

  if (isTagsFetching) {
    return (
      <FormControl fullWidth>
        <FormLabel>
          {t('admin.projectdetail.tabs.questions.form.fields.tags.label')}
        </FormLabel>
        <Select disabled multiline>
          <MenuItem value=''>
            {t('admin.projectdetail.tabs.questions.form.fields.tags.loading')}
          </MenuItem>
        </Select>
      </FormControl>
    )
  }

  return (
    <>
      <input type='hidden' name='tags' value={JSON.stringify(selectedTagIds)} />

      <FormControl fullWidth>
        <FormLabel htmlFor='tags'>
          {t('admin.projectdetail.tabs.questions.form.fields.tags.label')}
        </FormLabel>
        <Select
          id='tags'
          multiple
          value={selectedTagIds}
          onChange={handleTagsChange}
          input={<OutlinedInput multiline />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((tagId) => {
                const tag = tagsData?.find((t: Tag) => t.id === tagId)
                return tag ? <span key={tagId}>{tagRenderer(tag)}</span> : null
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
          }}>
          {tagsData?.map((tag: Tag) => (
            <MenuItem key={tag.id} value={tag.id}>
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
    </>
  )
}

export default TagSection
