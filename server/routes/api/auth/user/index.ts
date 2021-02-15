import { Router, Request, Response } from 'express'
import Connection from '@server/services/db/connection'
import { IPublicUser } from '@shared/PublicUser'
import { onlyAuthed } from '@server/guards/auth'
import { User } from '@server/services/db/entity/User'
import { MESSAGES, formatMessage, ERRORS } from '@server/services/communication'

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
    async (req: Request<{ nickname: string }>, res: Response) => {
      const connection = await Connection
      const userRepository = connection.getRepository(User)
      const users: User[] = await userRepository.find({ where: { nickname: req.params.nickname } })
      if (users.length === 1) {
        const [user] = users
        const formattedUser: IPublicUser = user.sanitizedUser
        const message = LOCAL_MESSAGES.user_found
        const formattedMessage = formatMessage(message, formattedUser)
        res
          .status(message.status)
          .json(
            formattedMessage,
          )
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
