import { TagGrid } from '../grids/TagGrid'

interface TagTabProps {
  id: number
}

export const TagTab: React.FC<TagTabProps> = ({ id }) => {
  return <TagGrid projectId={id} />
}

export default TagTab
