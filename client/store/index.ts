import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './slice/user'

export const { logIn, logInError, logInPending } = userSlice.actions

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
