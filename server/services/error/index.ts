export interface IError {
  title: string
  message: string
  status: 404 | 403 | 500
}

type AuthErrors = 'user_not_authenticated'

type AuthErrorRepository = Record<
  'auth',
  Record<AuthErrors, IError>
>

type UserErrors = 'same_nickname_multiple_users' | 'user_not_found'

type UserErrorRepository = Record<
  'users',
  Record<UserErrors, IError>
>

type ErrorRepository = AuthErrorRepository & UserErrorRepository

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
