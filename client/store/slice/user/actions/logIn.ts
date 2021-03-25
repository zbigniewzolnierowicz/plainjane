import { Action } from 'redux'
import { IPublicUser } from '@shared/PublicUser'
import { IUserState } from '../index'

interface ILogInAction extends Action<string> {
  payload: IPublicUser
}

export function logIn (state: IUserState, action: ILogInAction): void {
  state.pending = false
  state.user = action.payload
}
