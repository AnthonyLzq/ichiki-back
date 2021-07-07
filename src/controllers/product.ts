/* eslint-disable no-extra-parens */
import httpErrors from 'http-errors'
import { DtoProduct } from '../dto-interfaces'
import { IProduct, ProductModel } from '../models'
import { EFProducts as EFP, GE, MFP, errorHandling } from './utils'

type Process = {
  type: 'addProduct' | 'removeProduct' | 'updateStock'
}

class Product {
  private _args: DtoProduct | null

  constructor(args: DtoProduct | null = null) {
    this._args = args
  }

  // eslint-disable-next-line consistent-return
  public process({ type }: Process): Promise<IProduct> | Promise<string> {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'addProduct':
        return this._addProduct()
      case 'removeProduct':
        return this._removeProduct()
      case 'updateStock':
        return this._updateStock()
    }
  }

  private async _addProduct(): Promise<IProduct> {
    const {
      description,
      image,
      name,
      price,
      producer,
      stock
    } = this._args as DtoProduct

    try {
      const foundProduct = await ProductModel.findOne({ name, producer })

      if (foundProduct) throw new httpErrors.Conflict(EFP.ALREADY_REGISTERED)

      const product = new ProductModel({
        description,
        image,
        name,
        price,
        producer,
        stock
      })

      return await product.save()
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _removeProduct(): Promise<string> {
    const { id } = this._args as DtoProduct

    try {
      await ProductModel.findByIdAndDelete(id)

      return MFP.REMOVE_SUCCESS
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  private async _updateStock(): Promise<string> {
    const { id, stock } = this._args as DtoProduct

    try {
      const foundProduct = await ProductModel.findById(id)

      if (!foundProduct) throw new httpErrors.NotFound(EFP.NOT_FOUND)

      if (stock === 0) throw new httpErrors.BadRequest(EFP.NOTHING_TO_UPDATE)

      if (foundProduct.stock + (stock as number) < 0)
        throw new httpErrors.Conflict(EFP.NOT_ENOUGH)

      if (foundProduct.stock + (stock as number) === 0)
        return await this._removeProduct()

      await ProductModel.findByIdAndUpdate(
        id,
        {
          stock: foundProduct.stock + (stock as number)
        }
      )

      return MFP.STOCK_UPDATE_SUCCESS
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }
}

export { Product }
