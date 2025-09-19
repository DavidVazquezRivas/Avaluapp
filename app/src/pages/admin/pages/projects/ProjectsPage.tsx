import Layout from '@/components/layout/Layout'
import ProjectsGrid from './components/grid/ProjectsGrid'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

export const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const action = searchParams.get('action')

  // Limpiar la acción de la URL una vez procesada
  useEffect(() => {
    if (action) {
      // Remover el parámetro action de la URL
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev)
        newParams.delete('action')
        return newParams
      })
    }
  }, [action, setSearchParams])

  return (
    <Layout>
      <ProjectsGrid initialAction={action} />
    </Layout>
  )
}

export default ProjectsPage
