import { ENegativeStatusCodes, TUserErrorRepository, UserErrors } from '@shared/Message'

const UserErrorRepository: TUserErrorRepository = {
  [UserErrors.USER_ALREADY_EXISTS]: {
    title: UserErrors.USER_ALREADY_EXISTS,
    message: 'Multiple users with these parameters exist.',
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
  [UserErrors.USER_NOT_CREATED]: {
    title: UserErrors.USER_NOT_CREATED,
    message: 'User not created due to a server error.',
    status: ENegativeStatusCodes.INTERNAL_SERVER_ERROR,
  },
}

export default UserErrorRepository
