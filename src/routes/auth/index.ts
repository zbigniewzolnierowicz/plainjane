import { Router } from 'express'

import GoogleRoutes from './google'

const router = Router()

router.use('/google', GoogleRoutes)
router.get('/logout', (req, res) => {
  req.logOut()
  res.status(200).end()
})

export default router
