import { Router, NextFunction } from 'express'
import upload from 'express-fileupload'
import httpErrors from 'http-errors'

import { Response, Request } from '../custom'
import { response } from '../utils'
import { Product as ProductC } from '../controllers'
import { DtoProduct } from '../dto-interfaces'
import { idSchema, product, updateStock } from '../schemas'
import { IProduct } from '../models'

const Product = Router()

Product.route('/product/addProductWithImage').post(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      body: { args },
      files
    } = req

    try {
      if (!files)
        throw new httpErrors.BadRequest('Missing image')

      let dtoProduct: DtoProduct = JSON.parse(args as string)
      const { image } = files
      const { data } = image as upload.UploadedFile
      dtoProduct = { ...dtoProduct, image: data }

      await product.validateAsync(dtoProduct)
      const p = new ProductC(dtoProduct)
      const result = await p.process({ type: 'addProduct' }) as IProduct

      response(
        false,
        {
          result: {
            // eslint-disable-next-line no-underscore-dangle
            _id        : result._id,
            description: result.description,
            image      : result.image,
            name       : result.name,
            price      : result.price,
            producer   : result.producer,
            stock      : result.stock
          }
        },
        res,
        200
      )
    } catch (e) {
      if (e.message.includes('JSON'))
        next(new httpErrors.BadRequest('Malformed product'))

      if (e.isJoi) e.status = 422

      next(e)
    }
  }
)

Product.route('/product/addProductWithoutImage').post(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      body: { args }
    } = req

    try {
      await product.validateAsync(args)
      const p = new ProductC(args as DtoProduct)
      const result = await p.process({ type: 'addProduct' }) as IProduct

      response(
        false,
        {
          result: {
            // eslint-disable-next-line no-underscore-dangle
            _id        : result._id,
            description: result.description,
            name       : result.name,
            price      : result.price,
            producer   : result.producer,
            stock      : result.stock
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

Product.route('/product/removeProduct/:id').delete(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      params: { id }
    } = req

    try {
      await idSchema.validateAsync(id)
      const p = new ProductC({ id } as DtoProduct)
      const result = await p.process({ type: 'removeProduct' })

      response(false, { result }, res, 200)
    } catch (e) {
      if (e.isJoi) e.status = 422
      next(e)
    }
  }
)

Product.route('/product/updateStock').patch(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      body: { args }
    } = req

    try {
      await updateStock.validateAsync(args)
      const p = new ProductC(args as DtoProduct)
      const result = await p.process({ type: 'updateStock' })

      response(false, { result }, res, 200)
    } catch (e) {
      if (e.isJoi) e.status = 422
      next(e)
    }
  }
)

export { Product }
