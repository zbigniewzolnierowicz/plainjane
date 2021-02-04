import { Request, Response, NextFunction } from 'express'
import { ERRORS } from '../services/communication'

export const onlyAuthed = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) return res.status(ERRORS.auth.user_not_authenticated.status).json(ERRORS.auth.user_not_authenticated).end()
  else next()
}
