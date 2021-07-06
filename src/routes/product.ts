import { Router, NextFunction } from 'express'

import { Response, Request } from '../custom'
import { response } from '../utils'
import { Product as ProductC } from '../controllers'
import { DtoProduct } from '../dto-interfaces'
import { product } from '../schemas'

const Product = Router()

Product.route('/product/addProduct').post(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      body: { args }
    } = req

    try {
      await product.validateAsync(args)
      const p = new ProductC(args as DtoProduct)
      const result = await p.process({ type: 'addProduct' })

      response(false, { result }, res, 200)
    } catch (e) {
      if (e.isJoi) e.status = 422
      next(e)
    }
  }
)

export { Product }
