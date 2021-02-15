import { GenericMessages, /* ENegativeStatusCodes, */ IMessage } from '@shared/Message'

const GenericMessageRepository: Record<GenericMessages, IMessage<GenericMessages>> = {}

export default GenericMessageRepository
