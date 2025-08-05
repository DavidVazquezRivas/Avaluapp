import { User } from '@/models/user.model'

export interface ProjectBase {
  name: string
  description: string
}

export interface Project extends ProjectBase {
  id: number
  createdAt?: string
  admin?: User
}
