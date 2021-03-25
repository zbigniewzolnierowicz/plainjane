import { IUserState } from '../index'

export function logInPending (state: IUserState): void {
  state.pending = true
}
