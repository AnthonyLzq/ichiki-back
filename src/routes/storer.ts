import { Router, NextFunction } from 'express'

import { Response, Request } from '../custom'
import { response } from  '../utils'
import { Storer as StorerC } from '../controllers/storer'
import { DtoStorer } from '../dto-interfaces'
import { authUserSchema } from '../schemas'

const Storer = Router()

Storer.route('/storer/login')
  .post(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { body: { args } } = req

      try {
        await authUserSchema.validateAsync(args as DtoStorer)
        const s = new StorerC(args as DtoStorer)
        const result = await s.process({ type: 'login' })

        response(false, { result }, res, 200)
      } catch (e) {
        if (e.isJoi) e.status = 422
        next(e)
      }
    }
  )

export { Storer }