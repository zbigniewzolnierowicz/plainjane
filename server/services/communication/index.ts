import { IMessage, IErrorRepository, IMessageRepository } from '../../../shared/Message'
import AuthErrorRepository from './auth/errors'
import AuthMessageRepository from './auth/messages'
import UserErrorRepository from './users/errors'
import UserMessageRepository from './users/messages'
import GenericErrorRepository from './generic/errors'
import GenericMessageRepository from './generic/messages'

const formatMessage = <TTitle, T = string>(message: IMessage<TTitle, T>, content: T): IMessage<TTitle, T> => ({ ...message, content })

export const ERRORS: IErrorRepository = {
  auth: AuthErrorRepository,
  users: UserErrorRepository,
  generic: GenericErrorRepository,
}

export const MESSAGES: IMessageRepository = {
  auth: AuthMessageRepository,
  users: UserMessageRepository,
  generic: GenericMessageRepository,
}

export {
  formatMessage,
}
