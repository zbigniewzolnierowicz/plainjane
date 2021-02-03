interface IBaseMessage<T> {
  title: T
  message: string
}

export type AuthMessages = 'user_authenticated'
export type UserMessages = 'user_found'

export interface IMessage<T = never> extends IBaseMessage<AuthMessages | UserMessages> {
  status: 200
  content?: T
}

export type AuthMessageRepository = Record<
  'auth',
  Record<AuthMessages, IMessage>
>

export type UserMessageRepository = Record<
  'users',
  Record<UserMessages, IMessage>
>

export type MessageRepository = AuthMessageRepository & UserMessageRepository

export type AuthErrors = 'user_not_authenticated'
export type UserErrors = 'same_nickname_multiple_users' | 'user_not_found'

export type AuthErrorRepository = Record<
  'auth',
  Record<AuthErrors, IError>
>

export type UserErrorRepository = Record<
  'users',
  Record<UserErrors, IError>
>

export interface IError extends IBaseMessage<AuthErrors | UserErrors> {
  status: 404 | 403 | 500
}

export type ErrorRepository = AuthErrorRepository & UserErrorRepository
