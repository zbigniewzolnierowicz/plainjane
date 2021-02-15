import { GenericErrors, ENegativeStatusCodes, IError } from '@shared/Message'

const GenericErrorRepository: Record<GenericErrors, IError<GenericErrors>> = {
  [GenericErrors.BAD_REQUEST]: {
    title: GenericErrors.BAD_REQUEST,
    message: 'Malformed request body.',
    status: ENegativeStatusCodes.BAD_REQUEST,
  },
}

export default GenericErrorRepository
