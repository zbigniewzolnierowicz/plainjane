import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'] }),
)

router.get('/callback',
  async function (req, res, next) {
    passport.authenticate('google', { failureRedirect: '/user?error', successRedirect: '/user' })(req, res, next)
  },
)

export default router
