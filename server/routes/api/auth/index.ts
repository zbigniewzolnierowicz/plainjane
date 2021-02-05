import { Router } from 'express'
import { onlyAuthed } from '../../../guards/auth'
import GoogleRoutes from './google'
import UserRoutes from './user'

const router = Router()

router.use('/google', GoogleRoutes)
router.use('/user', UserRoutes)

router
  .get('/logout',
    onlyAuthed,
    (req, res) => {
      req.logOut()
      res.status(200).end()
    },
  )

export default router
