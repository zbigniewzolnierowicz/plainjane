import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'] }),
)

router.get('/callback',
  passport.authenticate('google', { failureRedirect: '/', successRedirect: '/' }),
)

export default router
