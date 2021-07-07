import crypto from 'crypto'
import httpErrors from 'http-errors'

import { DtoStorer } from '../dto-interfaces'
import { IStorer, StorerModel } from '../models'
import { GE, errorHandling } from './utils'

type Process = {
  type: 'login'
}

class Storer {
  private _args: DtoStorer | null

  constructor(args: DtoStorer | null = null) {
    this._args = args
  }

  // eslint-disable-next-line consistent-return
  public process({ type }: Process): Promise<IStorer> {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'login':
        return this._login()
    }
  }

  private async _login(): Promise<IStorer> {
    const { email, password } = this._args as DtoStorer
    const hashedPassword = crypto
      .createHash('md5')
      .update(password)
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
}

export { Storer }
