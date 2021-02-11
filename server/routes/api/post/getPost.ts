import { Router } from 'express'
import { onlyAuthed } from '@server/guards/auth'

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
