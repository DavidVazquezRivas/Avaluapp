import { createSlice } from '@reduxjs/toolkit'

export interface LoadingState {
  requestInProgress: number
  isLoading: boolean
}

export const LoadingInitialState: LoadingState = {
  requestInProgress: 0,
  isLoading: false,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: LoadingInitialState,
  reducers: {
    startRequest: (state: LoadingState) => {
      state.requestInProgress++
      state.isLoading = true
    },
    finishRequest: (state: LoadingState) => {
      state.requestInProgress--
      state.isLoading = state.requestInProgress > 0
    },
  },
})

export const { startRequest, finishRequest } = loadingSlice.actions
export default loadingSlice.reducer
