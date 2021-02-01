import { Request, Response, NextFunction } from 'express'

export const onlyAuthed = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) return res.status(403).end()
  else next()
}
