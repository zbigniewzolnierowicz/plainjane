import { Router } from 'express'

import AuthRoutes from './auth'
import PostRoutes from './post'

const router = Router()

router.use('/auth', AuthRoutes)
router.use('/post', PostRoutes)

export default router
