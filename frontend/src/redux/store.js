



import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authslice'
import jobSlice from "./jobslice"

export const store = configureStore({
  reducer: {
    auth:authSlice,
    job:jobSlice
  },
})
