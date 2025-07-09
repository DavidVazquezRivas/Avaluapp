import { User } from '@/models/user.model'
import { Project } from '../../projects/models/project.model'

export interface Survey {
  id: number
  name: string
  urlCode: string
  project: Project
  lead: User
  createdAt?: string
}

export interface SurveyRequest {
  id?: number
  name: string
  projectId: number
  leadId: number
}
