import { IPublicUser } from '@shared/PublicUser'
import { createSlice } from '@reduxjs/toolkit'
import { logInPending } from './actions/logInPending'
import { logInError } from './actions/logInError'
import { logIn } from './actions/logIn'

export interface IUserState {
  user?: IPublicUser,
  pending: boolean,
}

const userInitialState: IUserState = {
  user: undefined,
  pending: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    logInPending,
    logIn,
    logInError,
  },
})
