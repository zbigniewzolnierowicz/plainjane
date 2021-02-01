import { Router } from 'express'
import { onlyAuthed } from '../../../auth/guard'

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
  .get('/logout',
    onlyAuthed,
    (req, res) => {
      req.logOut()
      res.status(200).end()
    }
  )

export default router
