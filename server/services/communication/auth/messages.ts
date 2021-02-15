import { TAuthMessageRepository, AuthMessages, EPositiveStatusCodes } from '@shared/Message'

const AuthMessageRepository: TAuthMessageRepository = {
  [AuthMessages.USER_AUTHENTICATED]: {
    title: AuthMessages.USER_AUTHENTICATED,
    message: 'User has been authenticated.',
    status: EPositiveStatusCodes.OK,
  },
  [AuthMessages.USER_LOGGED_OUT]: {
    title: AuthMessages.USER_LOGGED_OUT,
    message: 'User has been logged out.',
    status: EPositiveStatusCodes.OK,
  },
}

export default AuthMessageRepository
