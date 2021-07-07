import httpErrors from 'http-errors'
import { DtoWarehouse } from '../dto-interfaces'
import { IWarehouse, WarehouseModel } from '../models'
import { EFW, GE, errorHandling } from './utils'
import { Storer } from './storer'

interface Process {
  type: 'addWarehouse'
}

class Warehouse {
  private _args: DtoWarehouse | null

  constructor(args: DtoWarehouse | null = null) {
    this._args = args
  }

  // eslint-disable-next-line consistent-return
  public process({ type }: Process): Promise<IWarehouse> {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'addWarehouse':
        return this._addWarehouse()
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
}

export { Warehouse }
