import { AuthMessages, EPositiveStatusCodes, IMessage } from '@shared/Message'

const AuthMessageRepository: Record<AuthMessages, IMessage<AuthMessages>> = {
  [AuthMessages.USER_AUTHENTICATED]: {
    title: AuthMessages.USER_AUTHENTICATED,
    message: 'User has been authenticated.',
    status: EPositiveStatusCodes.OK,
  },
}

export default AuthMessageRepository
