import { UserMessages, IMessage, EPositiveStatusCodes } from '@shared/Message'

const UserMessageRepository: Record<UserMessages, IMessage<UserMessages>> = {
  user_found: {
    title: 'user_found',
    message: 'User has been found.',
    status: EPositiveStatusCodes.OK,
  },
  user_created: {
    title: 'user_created',
    message: 'User has been created.',
    status: EPositiveStatusCodes.CREATED,
  },
}

export default UserMessageRepository
