import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import monthlySlice from './monthly_tours/monthlySlice'
import  journalSlice  from './tour_catalogue/journalSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    journal: journalSlice,
    monthly: monthlySlice
  },
})