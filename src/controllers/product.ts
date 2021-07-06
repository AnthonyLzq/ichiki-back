import httpErrors from 'http-errors'
import { DtoProduct } from '../dto-interfaces'
import { IProduct, ProductModel } from '../models'
import { EFProducts as EFP, GE, errorHandling } from './utils'

interface Process {
  type: 'addProduct'
}

class Product {
  private _args: DtoProduct | null

  constructor(args: DtoProduct | null = null) {
    this._args = args
  }

  // eslint-disable-next-line consistent-return
  public process({ type }: Process): Promise<IProduct> {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'addProduct':
        return this._addProduct()
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
      const foundProduct = await ProductModel.findOne({ name })

      if (foundProduct)
        throw new httpErrors.Conflict(EFP.ALREADY_REGISTERED)

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
}

export { Product }
