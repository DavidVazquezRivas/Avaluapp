import { Role } from '@/models/role.model'

interface UserBase {
  username: string
  email: string
  role: Role
}

export interface User extends UserBase {
  id: number
}

export interface UserWithCredentials extends UserBase {
  id?: number
  password: string
}
