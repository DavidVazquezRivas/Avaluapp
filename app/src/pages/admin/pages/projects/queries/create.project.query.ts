import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { ProjectBase } from '@/models/project.model'
import { createProject } from '../services/create.projects.service'
import Queries from '@/constants/queries.constants'

export default function createProjectQueryOptions(
  queryClient: QueryClient
): MutationOptions<AxiosResponse<any, any>, Error, ProjectBase> {
  return {
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getProjects] })
    },
    onError: (error) => {
      console.error('Error creating project:', error)
    },
  }
}
