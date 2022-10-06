import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import  journalSlice  from './tour_catalogue/journalSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    journal: journalSlice,
  },
})