import httpErrors from 'http-errors'

import { DtoProductAndStock, DtoWarehouse } from '../dto-interfaces'
import { IWarehouse, ProductModel, WarehouseModel } from '../models'
import { EFW, GE, MFW, errorHandling } from './utils'
import { Storer } from './storer'
import { Product } from './product'

type Process = {
  type: 'addWarehouse' | 'removeWarehouse' | 'list' | 'addProduct'
}

class Warehouse {
  private _args: DtoWarehouse | null

  constructor(args: DtoWarehouse | null = null) {
    this._args = args
  }

  // eslint-disable-next-line consistent-return
  public process({
    type
  }: Process): Promise<IWarehouse[]> | Promise<IWarehouse> | Promise<string> {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'addWarehouse':
        return this._addWarehouse()
      case 'removeWarehouse':
        return this._removeWarehouse()
      case 'list':
        return this._list()
      case 'addProduct':
        return this._addProduct()
    }
  }

  private async _addWarehouse(): Promise<IWarehouse> {
    const { address, country, name, owner } = this._args as DtoWarehouse

    try {
      const foundWarehouse = await WarehouseModel.findOne({ name, owner })

      if (foundWarehouse)
        throw new httpErrors.Conflict(EFW.ALREADY_REGISTER)

      const warehouse = new WarehouseModel({ address, country, name, owner })
      const newWarehouse = await warehouse.save()
      const s = new Storer({
        id          : owner,
        // eslint-disable-next-line no-underscore-dangle
        warehouseIds: [newWarehouse._id.toString()]
      })
      await s.process({ type: 'addWarehouse' })

      return newWarehouse
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _removeWarehouse(): Promise<string> {
    const { id } = this._args as DtoWarehouse

    try {
      await WarehouseModel.findByIdAndDelete(id)

      return MFW.REMOVE_SUCCESS
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _list(): Promise<IWarehouse[]> {
    const { owner } = this._args as DtoWarehouse

    try {
      return await WarehouseModel.find({ owner })
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _addProduct(): Promise<IWarehouse> {
    const { id, pns } = this._args as DtoWarehouse
    const { product, stock } = pns as DtoProductAndStock

    try {
      if (stock < 0)
        throw new httpErrors.BadRequest(EFW.STOCK_NEGATIVE)

      if (stock === 0)
        throw new httpErrors.BadRequest(EFW.STOCK_0)

      const foundProduct = await ProductModel.findById(product)

      if (!foundProduct)
        throw new httpErrors.NotFound(EFW.PRODUCT_NOT_FOUND)

      if (foundProduct.stock === 0)
        throw new httpErrors.Conflict(EFW.NO_PRODUCT_LEFT)

      if (stock > foundProduct.stock)
        throw new httpErrors.Conflict(EFW.PRODUCT_NOT_ENOUGH)

      const foundWarehouse = await WarehouseModel.findById(id)

      if (!foundWarehouse)
        throw new httpErrors.NotFound(EFW.WAREHOUSE_NOT_FOUND)

      let { pns: foundPns } = foundWarehouse
      let updatedWarehouse: IWarehouse | null
      const productIds = [...new Set(foundPns.map(f => f.product.toString()))]

      if (!productIds.includes(product))
        updatedWarehouse = await WarehouseModel.findByIdAndUpdate(
          id,
          {
            $push: {
              pns: {
                price: foundProduct.price,
                product,
                stock
              }
            }
          },
          {
            new: true
          }
        )
      else {
        foundPns = foundPns.map(f => {
          if (f.product.toString() === product)
            f.stock += stock

          return f
        })

        updatedWarehouse = await WarehouseModel.findByIdAndUpdate(
          id,
          { pns: foundPns },
          { new: true }
        )
      }

      if (!updatedWarehouse)
        throw new httpErrors.NotFound(EFW.WAREHOUSE_NOT_FOUND)

      const p = new Product({ id: product, stock: -stock })
      await p.process({ type: 'updateStock' })

      return updatedWarehouse
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }
}

export { Warehouse }
