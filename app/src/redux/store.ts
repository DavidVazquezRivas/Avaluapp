import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/redux/states/auth'
import projectReducer from '@/redux/states/project'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
