import { Router } from 'express'
import { onlyAuthed } from '../../../guards/auth'

const router = Router()

router.post('/',
  onlyAuthed,
  (req, res) => {
    res.json(req.body)
  },
)

export default router
