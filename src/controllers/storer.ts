/* eslint-disable no-extra-parens */
import crypto from 'crypto'
import httpErrors from 'http-errors'

import { DtoStorer } from '../dto-interfaces'
import { IStorer, StorerModel } from '../models'
import { GE, errorHandling } from './utils'

type Process = {
  type: 'login' | 'addWarehouse'
}

class Storer {
  private _args: DtoStorer | null

  constructor(args: DtoStorer | null = null) {
    this._args = args
  }

  // eslint-disable-next-line consistent-return
  public process({ type }: Process): Promise<IStorer> | Promise<void> {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'login':
        return this._login()
      case 'addWarehouse':
        return this._addWarehouse()
    }
  }

  private async _login(): Promise<IStorer> {
    const { email, password } = this._args as DtoStorer
    const hashedPassword = crypto
      .createHash('md5')
      .update(password as string)
      .digest('hex')

    try {
      const foundStorer = await StorerModel.findOne(
        {
          email,
          password: hashedPassword
        },
        '-__v -updatedAt -password'
      )

      if (!foundStorer)
        throw new httpErrors.NotFound(GE.NOT_FOUND)

      return foundStorer
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }

  // eslint-disable-next-line consistent-return
  private async _addWarehouse(): Promise<void> {
    const { id, warehouseIds } = this._args as DtoStorer

    try {
      await StorerModel.findByIdAndUpdate(
        id,
        {
          $push: { warehouseIds: (warehouseIds as string[])[0] }
        }
      )
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }
}

export { Storer }
