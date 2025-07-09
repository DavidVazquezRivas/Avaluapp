import getAllProjectsQueryOptions from '@/pages/admin/pages/projects/queries/getAll.project.query'
import { useEffect } from 'react'
import { useQueries } from '@tanstack/react-query'
import { setProjects } from '@/redux/states/project'
import { useDispatch } from 'react-redux'

export const useLoadMasters = () => {
  const dispatch = useDispatch()

  const [{ data: projectsData }] = useQueries({
    queries: [getAllProjectsQueryOptions()],
  })

  useEffect(() => {
    if (projectsData) dispatch(setProjects(projectsData || []))
  }, [projectsData])
}
