import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { tagRenderer } from '@/utils/renderers/tag.renderer'
import getAllTagsQueryOptions from '../../queries/tag/getAll.tag.query'
import { Tag } from '@/models/tag.model'

interface SingleTagInputProps {
  projectId: number
  selectedTag?: Tag
  onChange?: (selectedTagId: number | null) => void
}

export const SingleTagInput: React.FC<SingleTagInputProps> = ({
  projectId,
  selectedTag,
  onChange,
}) => {
  const { t } = useTranslation()
  const [selectedTagId, setSelectedTagId] = useState<number | ''>('')

  const { data: tagsData, isFetching: isTagsFetching } = useQuery(
    getAllTagsQueryOptions(projectId)
  )

  useEffect(() => {
    if (selectedTag) {
      setSelectedTagId(selectedTag.id)
    }
  }, [selectedTag])

  const handleTagChange = (event: SelectChangeEvent<number | ''>) => {
    const value = event.target.value
    const newSelectedId = value === '' ? null : Number(value)
    setSelectedTagId(value as number | '')
    onChange?.(newSelectedId)
  }

  if (isTagsFetching) {
    return (
      <FormControl fullWidth>
        <FormLabel>
          {t('admin.projectdetail.tabs.surveys.form.fields.tags.label')}
        </FormLabel>
        <Select disabled>
          <MenuItem value=''>
            {t('admin.projectdetail.tabs.surveys.form.fields.tags.loading')}
          </MenuItem>
        </Select>
      </FormControl>
    )
  }

  return (
    <>
      <input
        type='hidden'
        name='tag'
        value={selectedTagId === '' ? '' : selectedTagId}
      />

      <FormControl fullWidth>
        <FormLabel htmlFor='tags'>
          {t('admin.projectdetail.tabs.surveys.form.fields.tags.label')}
        </FormLabel>
        <Select
          id='tags'
          value={selectedTagId}
          onChange={handleTagChange}
          displayEmpty>
          {tagsData?.length === 0 && (
            <MenuItem value=''>
              <em>
                {t('admin.projectdetail.tabs.surveys.form.fields.tags.none')}
              </em>
            </MenuItem>
          )}
          {tagsData?.map((tag: Tag) => (
            <MenuItem key={tag.id} value={tag.id} sx={{ py: 1 }}>
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {tagRenderer(tag)}
              </span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default SingleTagInput
