import { Router } from 'express'
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

export default router
