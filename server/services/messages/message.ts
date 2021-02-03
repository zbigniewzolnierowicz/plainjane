import { MessageRepository } from '../../../shared/Message'

export const MESSAGES: MessageRepository = {
  auth: {
    user_authenticated: {
      title: 'user_authenticated',
      message: 'User has been authenticated.',
      status: 200,
    }
  },
  users: {
    user_found: {
      title: 'user_found',
      message: 'User has been found.',
      status: 200
    }
  }
}

export default MESSAGES
