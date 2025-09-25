
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './authslice'
import jobSlice from "./jobslice"

import { persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER } from 'redux-persist'

import storage from "redux-persist/lib/storage"
// import { version } from 'vite'

const persistConfig = {
  key: 'root',
  storage,
  version:1,
  // whitelist: ['auth'], 
}

const rootReducer = combineReducers({
  auth: authSlice,
  job:jobSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
