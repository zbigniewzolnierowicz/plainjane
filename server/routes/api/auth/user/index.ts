import { Router, Request, Response } from 'express'
import Connection from '../../../../services/db/connection'
import { IMessage, IError } from '../../../../../shared/Message'
import { IPublicUser } from '../../../../../shared/PublicUser'
import { onlyAuthed } from '../../../../guards/auth'
import { User } from '../../../../services/db/entity/User'
import { MESSAGES, formatMessage, ERRORS } from '../../../../services/communication'
import obfuscateUser from '../../../../utils/obfuscateUser'

const router = Router()
const LOCAL_ERRORS = ERRORS.users
const LOCAL_MESSAGES = MESSAGES.users

router
  .get('/',
    onlyAuthed,
    (req, res) => {
      res
        .status(LOCAL_MESSAGES.user_found.status)
        .json(formatMessage(LOCAL_MESSAGES.user_found, req.user))
        .end()
    },
  )

router
  .get('/:nickname',
    onlyAuthed,
    async (req: Request<{ nickname: string }>, res: Response<IMessage<IPublicUser> | IError>) => {
      const connection = await Connection
      const userRepository = connection.getRepository(User)
      const users: User[] = await userRepository.find({ where: { nickname: req.params.nickname } })
      if (users.length == 1) {
        const [user] = users
        const formattedUser: IPublicUser = obfuscateUser(user)
        const message = LOCAL_MESSAGES.user_found
        res
          .status(message.status)
          .json(
            formatMessage(message, formattedUser),
          )
          .end()
      } else if (users.length > 1) {
        const error = LOCAL_ERRORS.same_nickname_multiple_users
        res
          .status(error.status)
          .json(error)
          .end()
      } else {
        const error = LOCAL_ERRORS.user_not_found
        res
          .status(error.status)
          .json(error)
          .end()
      }
    },
  )


export default router
