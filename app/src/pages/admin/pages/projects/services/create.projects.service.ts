import { apiEndpoints } from '@/constants/endpoints'
import { ProjectBase } from '../models/project.model'
import axios from 'axios'

export const createProject = async (project: ProjectBase) => {
  return axios.post(apiEndpoints.projects.create, project)
}
