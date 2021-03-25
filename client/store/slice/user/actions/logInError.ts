import { IUserState } from '../index'

export function logInError (state: IUserState): void {
  state.pending = false
  state.user = undefined
}
