import { onlyUnauthed } from '@server/guards/auth'
import { ERRORS, formatMessage, MESSAGES } from '@server/services/communication'
import Connection from '@server/services/db/connection'
import { User } from '@server/services/db/entity/User'
import { IError } from '@shared/Message'
import { Request, Response, Router } from 'express'
import passport from 'passport'

const router = Router()

router.post('/',
  (req, res, next) => {
    if (req.body.username && req.body.password) {
      passport.authenticate('local')(req, res, next)
    } else {
      const message = ERRORS.generic.bad_request
      res.status(message.status).json(message).end()
    }
  },
  (_req, res) => {
    const message = MESSAGES.auth.user_authenticated
    res.status(message.status).json(message).end()
  },
)

router.post('/register',
  onlyUnauthed,
  async (req: Request<never, never, { name: string, username: string, email: string, password: string }>, res: Response) => {
    try {
      const { email, name, password, username } = req.body
      if (!(email && name && password && username)) throw ERRORS.generic.bad_request
      const connection = await Connection
      const userRepository = connection.getRepository(User)
      const newUser = new User()
      Object.assign(newUser, { email, name, password, username })
      const user = await userRepository.save(newUser)
      const newUserMessage = formatMessage(MESSAGES.users.user_created, user.sanitizedUser)
      res.status(newUserMessage.status).json(newUserMessage).end()
    } catch (e) {
      const genericError = ERRORS.users.user_not_created
      if (e instanceof Error) {
        if (e.name === 'QueryFailedError') {
          const adaptedError = ({ ...ERRORS.users.user_already_exists, content: e.message })
          res.status(adaptedError.status).json(adaptedError).end()
        } else {
          const adaptedError = ({ ...genericError, content: e.message })
          res.status(adaptedError.status).json(adaptedError).end()
        }
      } else if (e.status) {
        const customError: IError = e
        res.status(customError.status).json(customError).end()
      } else {
        res.status(genericError.status).json(genericError).end()
      }
    }
  },
)

export default router
