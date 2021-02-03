import { Request, Response, Router } from 'express'
import { onlyAuthed } from '../../../guards/auth'
import Connection from '../../../services/db/connection'
import { IPublicUser, User } from '../../../services/db/entity/User'
import { ERRORS, IError } from '../../../services/error'
import obfuscateUser from '../../../utils/obfuscateUser'

import GoogleRoutes from './google'

const router = Router()

router.use('/google', GoogleRoutes)

router
  .get('/profile',
    onlyAuthed,
    (req, res) => {
      res.json(req.user).end()
    }
  )

router
  .get('/user/:nickname',
    onlyAuthed,
    async (req: Request<{ nickname: string }>, res: Response<IPublicUser | IError>) => {
      const connection = await Connection
      const userRepository = connection.getRepository(User)
      const users: User[] = await userRepository.find({ where: { nickname: req.params.nickname } })
      if (users.length == 1) {
        const user = users[0]
        const formattedUser: IPublicUser = obfuscateUser(user)
        res.json(formattedUser).end()
      } else if (users.length > 1) {
        res.status(ERRORS.users.same_nickname_multiple_users.status).json(ERRORS.users.same_nickname_multiple_users).end()
      } else {
        res.status(ERRORS.users.user_not_found.status).json(ERRORS.users.user_not_found).end()
      }
    }
  )

router
  .get('/logout',
    onlyAuthed,
    (req, res) => {
      req.logOut()
      res.status(200).end()
    }
  )

export default router
