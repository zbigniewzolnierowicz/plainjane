export type AuthMessages = 'user_authenticated'
export type UserMessages = 'user_found' | 'user_created'

export enum EPositiveStatusCodes {
  OK = 200,
  CREATED = 201,
}

export enum ENegativeStatusCodes {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}

interface IBaseMessage<TTitle, TContent = undefined, TStatus = EPositiveStatusCodes | ENegativeStatusCodes> {
  title: TTitle
  message: string
  content?: TContent
  status: TStatus
}

export type IMessage<TTitle = AuthMessages | UserMessages, TContent = never> = IBaseMessage<TTitle, TContent, EPositiveStatusCodes>
export type IError<TTitle = AuthErrors | UserErrors, TContent = never> = IBaseMessage<TTitle, TContent, ENegativeStatusCodes>

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

export type ErrorRepository = AuthErrorRepository & UserErrorRepository
