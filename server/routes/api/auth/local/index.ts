import { onlyUnauthed } from '@server/guards/auth'
import { ERRORS, formatMessage, MESSAGES } from '@server/services/communication'
import Connection from '@server/services/db/connection'
import { User } from '@server/services/db/entity/User'
import { IError } from '@shared/Message'
import { hash } from 'argon2'
import { Request, Response, Router } from 'express'
import passport from 'passport'

const router = Router()

router.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  (_req, res) => {
    const message = MESSAGES.auth.user_authenticated
    res.status(message.status).json(message).end()
  },
)

router.post('/register',
  onlyUnauthed,
  async (req: Request<never, never, { name: string, nickname: string, email: string, password: string }>, res: Response) => {
    try {
      if (!(req.body.email && req.body.name && req.body.password && req.body.nickname)) throw ERRORS.users.bad_body
      const connection = await Connection
      const userRepository = connection.getRepository(User)
      const { email, name, password: unhashedPassword, nickname } = req.body
      const newUser = new User()
      const password = await hash(unhashedPassword)
      Object.assign(newUser, { email, name, password, nickname })
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
