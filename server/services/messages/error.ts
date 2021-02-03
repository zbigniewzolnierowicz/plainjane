import { ErrorRepository } from '../../../shared/Message'

export const ERRORS: ErrorRepository = {
  auth: {
    user_not_authenticated: {
      title: 'user_not_authenticated',
      message: 'User was not authenticated. Please, log in.',
      status: 403
    }
  },
  users: {
    same_nickname_multiple_users: {
      title: 'same_nickname_multiple_users',
      message: 'Multiple users with this nickname.',
      status: 500,
    },
    user_not_found: {
      title: 'user_not_found',
      message: 'User with the following nickname was not found.',
      status: 404,
    }
  }
}

export default ERRORS
