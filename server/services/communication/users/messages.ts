import { UserMessages, TUserMessageRepository, EPositiveStatusCodes } from '@shared/Message'

const UserMessageRepository: TUserMessageRepository = {
  [UserMessages.USER_FOUND]: {
    title: UserMessages.USER_FOUND,
    message: 'User has been found.',
    status: EPositiveStatusCodes.OK,
  },
  [UserMessages.USER_CREATED]: {
    title: UserMessages.USER_CREATED,
    message: 'User has been created.',
    status: EPositiveStatusCodes.CREATED,
  },
}

export default UserMessageRepository
