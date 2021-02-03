import { ErrorRepository } from '../../../../shared/Message'
import AuthErrorRepository from './auth'
import UserErrorRepository from './user'

export const ERRORS: ErrorRepository = {
  auth: AuthErrorRepository,
  users: UserErrorRepository
}

export default ERRORS
