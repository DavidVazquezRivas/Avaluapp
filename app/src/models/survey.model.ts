import { User } from '@/models/user.model'
import { Project } from '../pages/admin/pages/projects/models/project.model'
import { Tag } from './tag.model'

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
  tag: Tag
  createdAt?: string
}

export interface SurveyRequest {
  id?: number
  name: string
  projectId: number
  leadId: number
  tag: number
}
