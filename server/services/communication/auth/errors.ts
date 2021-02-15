import { AuthErrors, ENegativeStatusCodes, IError } from '@shared/Message'

const AuthErrorRepository: Record<AuthErrors, IError<AuthErrors>> = {
  user_not_authenticated: {
    title: 'user_not_authenticated',
    message: 'User was not authenticated. Please, log in.',
    status: ENegativeStatusCodes.FORBIDDEN,
  },
  user_already_authenticated: {
    title: 'user_already_authenticated',
    message: 'User is already logged in.',
    status: ENegativeStatusCodes.FORBIDDEN,
  },
}

export default AuthErrorRepository
