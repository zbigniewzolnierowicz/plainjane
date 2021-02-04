import { IMessage, ErrorRepository, MessageRepository } from '../../../shared/Message'
import AuthErrorRepository from './auth/errors'
import AuthMessageRepository from './auth/messages'
import UserErrorRepository from './users/errors'
import UserMessageRepository from './users/messages'

const formatMessage = <T>(message: IMessage<T>, content: T): IMessage<T> => ({ ...message, content })

export const ERRORS: ErrorRepository = {
  auth: AuthErrorRepository,
  users: UserErrorRepository,
}

export const MESSAGES: MessageRepository = {
  auth: AuthMessageRepository,
  users: UserMessageRepository,
}

export {
  formatMessage,
}
