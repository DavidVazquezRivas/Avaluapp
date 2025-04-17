import { createSlice } from '@reduxjs/toolkit'

export const AuthEmptyState = {
  accessToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: AuthEmptyState,
  reducers: {
    setToken: (_state, action) => ({ accessToken: action.payload }),
    clearToken: () => AuthEmptyState,
  },
})

export const { setToken, clearToken } = authSlice.actions
