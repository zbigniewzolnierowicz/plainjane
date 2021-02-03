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

export type ErrorRepository = AuthErrorRepository & UserErrorRepository
