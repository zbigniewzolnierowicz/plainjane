import { Router, Request } from 'express'
import { S3 } from '../../services/storage'

const router = Router()

router.get('/avatars/:path', async (req: Request<{ path: string }>, res) => {
  const avatar = await S3.getObject('avatars', req.params.path)
  avatar.pipe(res)
})

export default router
