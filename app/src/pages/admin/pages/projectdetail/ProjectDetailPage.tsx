import Layout from '@/components/layout/Layout'
import { useParams } from 'react-router-dom'
import TabManager from './components/tabmanager/TabManager'

export const ProjectDetailPage = () => {
  const { id } = useParams()

  return (
    <Layout align='start'>
      <TabManager id={parseInt(id ?? '0')} />
    </Layout>
  )
}

export default ProjectDetailPage
