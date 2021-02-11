import { Router } from 'express'
import { onlyAuthed } from '@server/guards/auth'

const router = Router()

router.post('/',
  onlyAuthed,
  (req, res) => {
    res.json(req.body)
  },
)

export default router
