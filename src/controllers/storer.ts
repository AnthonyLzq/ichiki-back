import crypto from 'crypto'
import httpErrors from 'http-errors'

import { DtoStorer } from '../dto-interfaces'
import { IStorer, StorerModel } from '../models'
import { EFS, errorHandling } from './utils'

interface Process {
  type: 'login'
}

class Storer {
  private _args: DtoStorer | null

  constructor(args: DtoStorer | null = null) {
    this._args = args
  }

  // eslint-disable-next-line consistent-return
  public process({ type }: Process): unknown {
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
      const foundUser = await StorerModel.findOne({
        email,
        password: hashedPassword
      })

      if (!foundUser)
        throw new httpErrors.NotFound(EFS.NOT_FOUND)

      return foundUser
    } catch (e) {
      return errorHandling(e, EFS.GENERIC)
    }
  }
}

export { Storer }
