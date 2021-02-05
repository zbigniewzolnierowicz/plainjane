import { Router, Request, Response } from 'express'
import Connection from '../../../../services/db/connection'
import { IMessage, IError } from '../../../../../shared/Message'
import { IPublicUser } from '../../../../../shared/PublicUser'
import { onlyAuthed } from '../../../../guards/auth'
import { User } from '../../../../services/db/entity/User'
import { MESSAGES, formatMessage, ERRORS } from '../../../../services/communication'
import obfuscateUser from '../../../../utils/obfuscateUser'

const router = Router()

router
  .get('/',
    onlyAuthed,
    (req, res) => {
      res
        .status(MESSAGES.users.user_found.status)
        .json(formatMessage(MESSAGES.users.user_found, req.user))
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
        res
          .status(MESSAGES.users.user_found.status)
          .json(
            formatMessage(MESSAGES.users.user_found, formattedUser),
          )
          .end()
      } else if (users.length > 1) {
        res
          .status(ERRORS.users.same_nickname_multiple_users.status)
          .json(ERRORS.users.same_nickname_multiple_users)
          .end()
      } else {
        res
          .status(ERRORS.users.user_not_found.status)
          .json(ERRORS.users.user_not_found)
          .end()
      }
    },
  )


export default router
