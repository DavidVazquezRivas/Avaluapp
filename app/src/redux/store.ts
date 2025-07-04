import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/redux/states/auth'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
