import { apiEndpoints } from '@/constants/endpoints'
import { ProjectBase } from '@/models/project.model'
import axios from 'axios'

export const updateProject = async (id: number, project: ProjectBase) => {
  return axios.put(apiEndpoints.projects.update(id), project)
}
