import getAllProjectsQueryOptions from '@/pages/admin/pages/projects/queries/getAll.project.query'
import { useEffect } from 'react'
import { useQueries } from '@tanstack/react-query'
import { setProjects } from '@/redux/states/project'
import { useDispatch } from 'react-redux'
import getUsersQueryOptions from '@/pages/admin/pages/users/queries/get.users.query'
import { setUsers } from '@/redux/states/user'

export const useLoadMasters = () => {
  const dispatch = useDispatch()

  const [{ data: projectsData }, { data: userData }] = useQueries({
    queries: [getAllProjectsQueryOptions(), getUsersQueryOptions()],
  })

  useEffect(() => {
    if (projectsData) dispatch(setProjects(projectsData || []))
    if (userData) dispatch(setUsers(userData || []))
  }, [projectsData, userData])
}
