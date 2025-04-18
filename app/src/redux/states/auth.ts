import { createSlice } from '@reduxjs/toolkit'

export interface AuthState {
  accessToken: string | null
  user: {
    id: string
    name: string
    email: string
    role: string
  } | null
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
