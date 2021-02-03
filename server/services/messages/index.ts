import { IMessage } from '../../../shared/Message'
import ERRORS from './errors'
import MESSAGES from './message'

const formatMessage = <T>(message: IMessage<T>, content: T): IMessage<T> => ({ ...message, content })

export {
  ERRORS,
  MESSAGES,
  formatMessage
}
