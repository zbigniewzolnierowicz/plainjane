import CreateNewPostRoutes from './createNewPost'
import GetPostRoutes from './getPost'
import { Router } from 'express'

const router = Router()

router.use('/new', CreateNewPostRoutes)
router.use('/get', GetPostRoutes)

export default router
