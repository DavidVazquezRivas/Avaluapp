import { MutationOptions, QueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import Queries from '@/constants/queries.constants'
import { updateProject } from '../services/update.projects.service'
import { Project } from '../models/project.model'

export default function updateProjectQueryOptions(
  queryClient: QueryClient
): MutationOptions<AxiosResponse<any, any>, Error, Project> {
  return {
    mutationFn: (project: Project) => updateProject(project.id, project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Queries.getProjects] })
    },
    onError: (error) => {
      console.error('Error updating project:', error)
    },
  }
}
