import { Router, NextFunction } from 'express'

import { Response, Request } from '../custom'
import { response } from '../utils'
import { Warehouse as WarehouseC } from '../controllers'
import { DtoWarehouse } from '../dto-interfaces'
import { addProduct, addWarehouse, idSchema } from '../schemas'
import { IWarehouse } from '../models'

const Warehouse = Router()

Warehouse.route('/warehouse/addWarehouse').post(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      body: { args }
    } = req

    try {
      await addWarehouse.validateAsync(args)
      const w = new WarehouseC(args as DtoWarehouse)
      const result = await w.process({ type: 'addWarehouse' }) as IWarehouse

      response(
        false,
        {
          result: {
            address: result.address,
            country: result.country,
            // eslint-disable-next-line no-underscore-dangle
            id     : result._id,
            name   : result.name,
            owner  : result.owner
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

Warehouse.route('/warehouse/removeWarehouse/:id').delete(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      params: { id }
    } = req

    try {
      await idSchema.validateAsync(id)
      const w = new WarehouseC({ id } as DtoWarehouse)
      const result = await w.process({ type: 'removeWarehouse' })

      response(false, { result }, res, 200)
    } catch (e) {
      if (e.isJoi) e.status = 422
      next(e)
    }
  }
)

Warehouse.route('/warehouse/list/:owner').get(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      params: { owner }
    } = req

    try {
      await idSchema.validateAsync(owner)
      const w = new WarehouseC({ owner } as DtoWarehouse)
      const result = await w.process({ type: 'list' }) as IWarehouse[]

      response(
        false,
        {
          result: result.map(cWarehouse => ({
            address: cWarehouse.address,
            country: cWarehouse.country,
            // eslint-disable-next-line no-underscore-dangle
            id     : cWarehouse._id,
            name   : cWarehouse.name,
            pns    : cWarehouse.pns
          }))
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

Warehouse.route('/warehouse/addProduct').patch(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      body: { args }
    } = req

    try {
      await addProduct.validateAsync(args)
      const w = new WarehouseC(args as DtoWarehouse)
      const result = await w.process({ type: 'addProduct' }) as IWarehouse

      response(
        false,
        {
          result: {
            address: result.address,
            country: result.country,
            // eslint-disable-next-line no-underscore-dangle
            id     : result._id,
            name   : result.name,
            pns    : result.pns
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

export { Warehouse }
