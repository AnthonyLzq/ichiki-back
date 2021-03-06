import { Router, NextFunction } from 'express'

import { Response, Request } from '../custom'
import { response } from '../utils'
import { Storer as StorerC } from '../controllers'
import { DtoStorer } from '../dto-interfaces'
import { signIn } from '../schemas'
import { IStorer } from '../models'

const Storer = Router()

Storer.route('/storer/login').post(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      body: { args }
    } = req

    try {
      await signIn.validateAsync(args)
      const s = new StorerC(args as DtoStorer)
      const result = await s.process({ type: 'login' }) as IStorer

      response(
        false,
        {
          result: {
            email       : result.email,
            // eslint-disable-next-line no-underscore-dangle
            id          : result._id,
            name        : result.name,
            warehouseIds: result.warehouseIds
          }
        },
        res,
        200
      )
    } catch (e) {
      if (e.isJoi) e.status = 422
      next(e)
    }
  }
)

export { Storer }
