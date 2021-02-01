import { Router } from 'express'

import ApiRoutes from './api'
import ClientRoute from './client'
import StaticAssetsRoutes from './static'

const router = Router()

router.use('/api', ApiRoutes)
router.use('/static', StaticAssetsRoutes)
router.use('/', ClientRoute)

export default router
