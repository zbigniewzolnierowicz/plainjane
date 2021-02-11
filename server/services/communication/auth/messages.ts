import { AuthMessages, IMessage } from '@shared/Message'

const AuthMessageRepository: Record<AuthMessages, IMessage> = {
  user_authenticated: {
    title: 'user_authenticated',
    message: 'User has been authenticated.',
    status: 200,
  },
}

export default AuthMessageRepository
