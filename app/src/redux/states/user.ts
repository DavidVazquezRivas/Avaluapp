import { User } from '@/models/user.model'
import { createSlice } from '@reduxjs/toolkit'

export interface UserState {
  user: User[]
}

export const UserEmptyState: UserState = {
  user: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState: UserEmptyState,
  reducers: {
    setUsers: (_state, action) => ({ ..._state, user: action.payload }),
    clearUsers: () => UserEmptyState,
  },
})

export const { setUsers, clearUsers } = userSlice.actions
export default userSlice.reducer
