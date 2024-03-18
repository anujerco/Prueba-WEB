// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import book from './book'

export const store = configureStore({
  reducer: {
    book,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
