import { GenericErrors, ENegativeStatusCodes, TGenericErrorRepository } from '@shared/Message'

const GenericErrorRepository: TGenericErrorRepository = {
  [GenericErrors.BAD_REQUEST]: {
    title: GenericErrors.BAD_REQUEST,
    message: 'Malformed request body.',
    status: ENegativeStatusCodes.BAD_REQUEST,
  },
}

export default GenericErrorRepository
