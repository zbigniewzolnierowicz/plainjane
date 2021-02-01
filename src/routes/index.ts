import { Router } from 'express'

import ApiRoutes from './api'

const router = Router()

router.use('/api', ApiRoutes)

export default router
