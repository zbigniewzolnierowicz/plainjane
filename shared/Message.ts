export enum AuthMessages {
  USER_AUTHENTICATED = 'user_authenticated'
}
export enum UserMessages {
 USER_FOUND = 'user_found',
 USER_CREATED = 'user_created'
}

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

export type AuthMessageRepository = Record<
  'auth',
  Record<AuthMessages, IMessage<AuthMessages>>
>

export type UserMessageRepository = Record<
  'users',
  Record<UserMessages, IMessage<UserMessages>>
>

export type MessageRepository = AuthMessageRepository & UserMessageRepository

export enum AuthErrors {
  NOT_AUTHENTICATED = 'user_not_authenticated',
  ALREADY_AUTHENTICATED = 'user_already_authenticated'
}

export enum UserErrors {
  USER_ALREADY_EXISTS = 'user_already_exists',
  USER_NOT_FOUND = 'user_not_found',
  INCORRECT_PASSWORD = 'incorrect_password',
  USER_NOT_CREATED = 'user_not_created',
  BAD_BODY = 'bad_body'
}

export type IMessage<TTitle = AuthMessages & UserMessages, TContent = never> = IBaseMessage<TTitle, TContent, EPositiveStatusCodes>
export type IError<TTitle = AuthErrors & UserErrors, TContent = never> = IBaseMessage<TTitle, TContent, ENegativeStatusCodes>

export type AuthErrorRepository = Record<
  'auth',
  Record<AuthErrors, IError<AuthErrors>>
>

export type UserErrorRepository = Record<
  'users',
  Record<UserErrors, IError<UserErrors>>
>

export type ErrorRepository = AuthErrorRepository & UserErrorRepository
