import { TAuthErrorRepository, AuthErrors, ENegativeStatusCodes } from '@shared/Message'

const AuthErrorRepository: TAuthErrorRepository = {
  [AuthErrors.NOT_AUTHENTICATED]: {
    title: AuthErrors.NOT_AUTHENTICATED,
    message: 'User was not authenticated. Please, log in.',
    status: ENegativeStatusCodes.FORBIDDEN,
  },
  [AuthErrors.ALREADY_AUTHENTICATED]: {
    title: AuthErrors.ALREADY_AUTHENTICATED,
    message: 'User is already logged in.',
    status: ENegativeStatusCodes.FORBIDDEN,
  },
}

export default AuthErrorRepository
