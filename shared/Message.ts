interface IBaseMessage<TTitle, TContent = undefined> {
  title: TTitle
  message: string
  content?: TContent
}

export type AuthMessages = 'user_authenticated'
export type UserMessages = 'user_found' | 'user_created'

export interface IMessage<T = never> extends IBaseMessage<AuthMessages | UserMessages, T> {
  status: 200
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

export type AuthErrors = 'user_not_authenticated' | 'user_already_authenticated'
export type UserErrors = 'same_nickname_multiple_users' | 'user_not_found' | 'incorrect_password' | 'user_not_created' | 'bad_body'

export type AuthErrorRepository = Record<
  'auth',
  Record<AuthErrors, IError>
>

export type UserErrorRepository = Record<
  'users',
  Record<UserErrors, IError>
>

export interface IError<T = never> extends IBaseMessage<AuthErrors | UserErrors, T> {
  status: 400 | 404 | 403 | 500
}

export type ErrorRepository = AuthErrorRepository & UserErrorRepository
