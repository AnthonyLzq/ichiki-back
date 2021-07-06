import { Request } from 'express'
import { DtoStorer, DtoProducer, DtoProduct } from '../dto-interfaces'

/*
 * With this piece of code we ca personalize the attributes of the request,
 * in case we need it.
 */

interface CustomRequest extends Request {
  body: {
    args?: DtoStorer | DtoProducer | DtoProduct | string
  }
}

export { CustomRequest as Request }
