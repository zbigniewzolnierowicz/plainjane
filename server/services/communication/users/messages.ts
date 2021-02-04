import { UserMessages, IMessage } from '../../../../shared/Message'

const UserMessageRepository: Record<UserMessages, IMessage> = {
  user_found: {
    title: 'user_found',
    message: 'User has been found.',
    status: 200
  }
}

export default UserMessageRepository
