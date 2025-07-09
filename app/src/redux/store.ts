import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/redux/states/auth'
import projectReducer from '@/redux/states/project'
import userReducer from '@/redux/states/user'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    user: userReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
