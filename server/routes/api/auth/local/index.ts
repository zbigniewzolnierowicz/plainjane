import { onlyUnauthed } from '@server/guards/auth'
import { ERRORS, MESSAGES } from '@server/services/communication'
import Connection from '@server/services/db/connection'
import { User } from '@server/services/db/entity/User'
import { IError, IMessage } from '@shared/Message'
import { IPublicUser } from '@shared/PublicUser'
import { Request, Response, Router } from 'express'
import passport from 'passport'

const router = Router()

router.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  (_req, res) => {
    res.json({
      message: 'Logged in',
    })
  },
)

router.post('/register',
  onlyUnauthed,
  async (req: Request<never, never, { name: string, nickname: string, email: string, password: string }>, res: Response<IMessage<IPublicUser> | IError<string>>) => {
    try {
      if (!(req.body.email && req.body.name && req.body.password && req.body.nickname)) throw ERRORS.users.bad_body
      const connection = await Connection
      const userRepository = connection.getRepository(User)
      const { email, name, password, nickname } = req.body
      const newUser = new User({ email, name, nickname, password})
      const user = await userRepository.save(newUser)
      const newUserMessage: IMessage<IPublicUser> = ({ ...MESSAGES.users.user_created, content: user.sanitizedUser })
      res.status(newUserMessage.status).json(newUserMessage).end()
    } catch (e) {
      const genericError = ERRORS.users.user_not_created
      if (e instanceof Error) {
        const adaptedError: IError<string> = ({ ...genericError, content: e.message })
        res.status(adaptedError.status).json(adaptedError).end()
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
