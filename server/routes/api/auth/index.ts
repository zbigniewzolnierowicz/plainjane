import { Router } from 'express'

import { onlyAuthed } from '@server/guards/auth'
import { MESSAGES } from '@server/services/communication'
import GoogleRoutes from './google'
import LocalRoutes from './local'
import UserRoutes from './user'

const router = Router()

router.use('/google', GoogleRoutes)
router.use('/user', UserRoutes)
router.use('/local', LocalRoutes)

router
  .get('/logout',
    onlyAuthed,
    (req, res) => {
      req.logOut()
      const message = MESSAGES.auth.user_logged_out
      res.status(message.status).json(message).end()
    },
  )

export default router
