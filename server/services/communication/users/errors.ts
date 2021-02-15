import { ENegativeStatusCodes, IError, UserErrors } from '@shared/Message'

const UserErrorRepository: Record<UserErrors, IError<UserErrors>> = {
  [UserErrors.SAME_NICKNAME_MULTIPLE_USERS]: {
    title: UserErrors.SAME_NICKNAME_MULTIPLE_USERS,
    message: 'Multiple users with this nickname.',
    status: ENegativeStatusCodes.INTERNAL_SERVER_ERROR,
  },
  [UserErrors.USER_NOT_FOUND]: {
    title: UserErrors.USER_NOT_FOUND,
    message: 'User with the following nickname was not found.',
    status: ENegativeStatusCodes.NOT_FOUND,
  },
  [UserErrors.INCORRECT_PASSWORD]: {
    title: UserErrors.INCORRECT_PASSWORD,
    message: 'Incorrect password.',
    status: ENegativeStatusCodes.FORBIDDEN,
  },
  [UserErrors.BAD_BODY]: {
    title: UserErrors.BAD_BODY,
    message: 'Malformed request body.',
    status: ENegativeStatusCodes.BAD_REQUEST,
  },
  [UserErrors.USER_NOT_CREATED]: {
    title: UserErrors.USER_NOT_CREATED,
    message: 'User not created due to a server error.',
    status: ENegativeStatusCodes.INTERNAL_SERVER_ERROR,
  },
}

export default UserErrorRepository
