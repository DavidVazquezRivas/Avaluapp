import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/redux/states/auth'
import loadingReducer from '@/redux/states/loading'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
