import { ENegativeStatusCodes, IError, UserErrors } from '@shared/Message'

const UserErrorRepository: Record<UserErrors, IError<UserErrors>> = {
  same_nickname_multiple_users: {
    title: 'same_nickname_multiple_users',
    message: 'Multiple users with this nickname.',
    status: ENegativeStatusCodes.INTERNAL_SERVER_ERROR,
  },
  user_not_found: {
    title: 'user_not_found',
    message: 'User with the following nickname was not found.',
    status: ENegativeStatusCodes.NOT_FOUND,
  },
  incorrect_password: {
    title: 'incorrect_password',
    message: 'Incorrect password.',
    status: ENegativeStatusCodes.FORBIDDEN,
  },
  bad_body: {
    title: 'bad_body',
    message: 'Malformed request body.',
    status: ENegativeStatusCodes.BAD_REQUEST,
  },
  user_not_created: {
    title: 'user_not_created',
    message: 'User not created due to a server error.',
    status: ENegativeStatusCodes.INTERNAL_SERVER_ERROR,
  },
}

export default UserErrorRepository
