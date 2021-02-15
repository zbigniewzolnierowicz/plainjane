import { AuthMessages, EPositiveStatusCodes, IMessage } from '@shared/Message'

const AuthMessageRepository: Record<AuthMessages, IMessage<AuthMessages>> = {
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
