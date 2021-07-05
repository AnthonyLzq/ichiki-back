import { Router, NextFunction } from 'express'

import { Response, Request } from '../custom'
import { response } from '../utils'
import { Producer as ProducerC } from '../controllers'
import { DtoProducer } from '../dto-interfaces'
import { IProducer } from '../models'
import { signUpProducer } from '../schemas'

const Producer = Router()

Producer.route('/producer/signUp').post(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      body: { args }
    } = req

    try {
      await signUpProducer.validateAsync(args as DtoProducer)
      const p = new ProducerC(args as DtoProducer)
      const result = await p.process({ type: 'signUp' }) as IProducer

      response(
        false,
        {
          result: {
            // eslint-disable-next-line no-underscore-dangle
            _id    : result._id,
            country: result.country,
            email  : result.email,
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
