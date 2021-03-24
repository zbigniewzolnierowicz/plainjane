import { Router, Request } from 'express'

import { onlyAuthed } from '@server/guards/auth'
import { MESSAGES } from '@server/services/communication'
import GoogleRoutes from './google'
import LocalRoutes from './local'
import UserRoutes from './user'
import { AuthMessages, IMessage } from '@shared/Message'

const router = Router()

router.use('/google', GoogleRoutes)
router.use('/user', UserRoutes)
router.use('/local', LocalRoutes)

router
  .get('/logout',
    onlyAuthed,
    (req: Request<never, IMessage<AuthMessages, never>, never, { redirect?: string }>, res) => {
      req.logOut()
      const message = MESSAGES.auth.user_logged_out
      if (req.query.redirect) {
        res.redirect(req.query.redirect)
      } else {
        res.status(message.status).json(message).end()
      }
    },
  )

export default router
