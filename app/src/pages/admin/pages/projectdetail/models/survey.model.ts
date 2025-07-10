import { User } from '@/models/user.model'
import { Project } from '../../projects/models/project.model'

export enum SurveyStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface Survey {
  id: number
  name: string
  urlCode: string
  project: Project
  lead: User
  status: SurveyStatus
  createdAt?: string
}

export interface SurveyRequest {
  id?: number
  name: string
  projectId: number
  leadId: number
}
