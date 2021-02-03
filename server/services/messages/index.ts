import { IMessage } from '../../../shared/Message'
import ERRORS from './error'
import MESSAGES from './message'

const formatMessage = <T>(message: IMessage<T>, content: T): IMessage<T> => ({ ...message, content })

export {
  ERRORS,
  MESSAGES,
  formatMessage
}
