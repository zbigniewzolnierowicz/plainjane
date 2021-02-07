import { Router } from 'express'
import { onlyAuthed } from '../../../guards/auth'

const router = Router()

router.get('/',
  onlyAuthed,
  (req, res) => {
    res.json({
      foo: 'bar',
    })
  },
)

export default router
