interface IBaseMessage<T> {
  title: T
  message: string
}

type AuthMessages = 'user_authenticated'
type UserMessages = 'user_found'

export interface IMessage<T = never> extends IBaseMessage<AuthMessages | UserMessages> {
  status: 200
  content?: T
}

type AuthMessageRepository = Record<
  'auth',
  Record<AuthMessages, IMessage>
>

type UserMessageRepository = Record<
  'users',
  Record<UserMessages, IMessage>
>

export type MessageRepository = AuthMessageRepository & UserMessageRepository

type AuthErrors = 'user_not_authenticated'
type UserErrors = 'same_nickname_multiple_users' | 'user_not_found'

type AuthErrorRepository = Record<
  'auth',
  Record<AuthErrors, IError>
>

type UserErrorRepository = Record<
  'users',
  Record<UserErrors, IError>
>

export interface IError extends IBaseMessage<AuthErrors | UserErrors> {
  status: 404 | 403 | 500
}

export type ErrorRepository = AuthErrorRepository & UserErrorRepository
