import { Request, Router } from 'express'
import { onlyAuthed } from '../../../services/auth/guard'
import Connection from '../../../services/db/connection'
import { IPublicUser, User } from '../../../services/db/entity/User'

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
    async (req: Request<{ nickname: string }>, res) => {
      const connection = await Connection
      const userRepository = connection.getRepository(User)
      const user: User = userRepository.find({ where: { nickname: req.params.nickname } })
      const formattedUser: IPublicUser = {  }
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
