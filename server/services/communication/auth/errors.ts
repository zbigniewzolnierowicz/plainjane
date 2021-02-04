import { AuthErrors, IError } from '../../../../shared/Message'

const AuthErrorRepository: Record<AuthErrors, IError> = {
  user_not_authenticated: {
    title: 'user_not_authenticated',
    message: 'User was not authenticated. Please, log in.',
    status: 403
  },
}

export default AuthErrorRepository
