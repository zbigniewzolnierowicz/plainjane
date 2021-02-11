import { IError, UserErrors } from '@shared/Message'

const UserErrorRepository: Record<UserErrors, IError> = {
  same_nickname_multiple_users: {
    title: 'same_nickname_multiple_users',
    message: 'Multiple users with this nickname.',
    status: 500,
  },
  user_not_found: {
    title: 'user_not_found',
    message: 'User with the following nickname was not found.',
    status: 404,
  },
}

export default UserErrorRepository
