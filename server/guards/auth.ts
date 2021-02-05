import { Request, Response, NextFunction } from 'express'
import { ERRORS } from '../services/communication'

const LOCAL_ERRORS = ERRORS.auth

export const onlyAuthed = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    const error = LOCAL_ERRORS.user_not_authenticated
    return res.status(error.status).json(error).end()
  }
  else next()
}
