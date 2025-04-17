import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from '@/redux/states/auth'

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
})
