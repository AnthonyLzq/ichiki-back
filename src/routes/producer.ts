import { Router, NextFunction } from 'express'

import { Response, Request } from '../custom'
import { response } from '../utils'
import { Producer as ProducerC } from '../controllers'
import { DtoProducer } from '../dto-interfaces'
import { signUpProducer, signIn } from '../schemas'

const Producer = Router()

Producer.route('/producer/signUp').post(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      body: { args }
    } = req

    try {
      await signUpProducer.validateAsync(args)
      const p = new ProducerC(args as DtoProducer)
      const result = await p.process({ type: 'signUp' })

      response(
        false,
        {
          result: {
            country: result.country,
            email  : result.email,
            // eslint-disable-next-line no-underscore-dangle
            id     : result._id,
            name   : result.name
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

Producer.route('/producer/login').post(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      body: { args }
    } = req

    try {
      await signIn.validateAsync(args)
      const p = new ProducerC(args as DtoProducer)
      const result = await p.process({ type: 'login' })

      response(
        false,
        {
          result: {
            country: result.country,
            email  : result.email,
            // eslint-disable-next-line no-underscore-dangle
            id     : result._id,
            name   : result.name
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

export { Producer }
