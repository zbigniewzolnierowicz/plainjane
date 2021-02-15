import { IMessage, ErrorRepository, MessageRepository, UserMessages, AuthMessages } from '../../../shared/Message'
import AuthErrorRepository from './auth/errors'
import AuthMessageRepository from './auth/messages'
import UserErrorRepository from './users/errors'
import UserMessageRepository from './users/messages'
import GenericErrorRepository from './generic/errors'
import GenericMessageRepository from './generic/messages'

const formatMessage = <T = string, TTitle = AuthMessages | UserMessages>(message: IMessage<TTitle, T>, content: T): IMessage<TTitle, T> => ({ ...message, content })

export const ERRORS: ErrorRepository = {
  auth: AuthErrorRepository,
  users: UserErrorRepository,
  generic: GenericErrorRepository,
}

export const MESSAGES: MessageRepository = {
  auth: AuthMessageRepository,
  users: UserMessageRepository,
  generic: GenericMessageRepository,
}

export {
  formatMessage,
}
