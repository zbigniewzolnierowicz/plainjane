import { AuthMessages, EPositiveStatusCodes, IMessage } from '@shared/Message'

const AuthMessageRepository: Record<AuthMessages, IMessage<AuthMessages>> = {
  user_authenticated: {
    title: 'user_authenticated',
    message: 'User has been authenticated.',
    status: EPositiveStatusCodes.OK,
  },
}

export default AuthMessageRepository
