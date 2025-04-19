import { User } from '@/models/user.model'
import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  accessToken: string | null
  user: User | null
}

export const AuthEmptyState = {
  accessToken: null,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: AuthEmptyState,
  reducers: {
    setSession: (_state, action) => ({ ...action.payload }),
    clearSession: () => AuthEmptyState,
  },
})

export const { setSession, clearSession } = authSlice.actions
export default authSlice.reducer
