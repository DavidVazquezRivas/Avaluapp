import { Role } from '@/models/role.model'

export interface User {
  id: number
  username: string
  email: string
  role: Role
}
