import crypto from 'crypto'
import httpErrors from 'http-errors'

import { DtoProducer } from '../dto-interfaces'
import { IProducer, ProducerModel } from '../models'
import { GE, errorHandling } from './utils'

interface Process {
  type: 'login' | 'signUp'
}

class Producer {
  private _args: DtoProducer | null

  constructor(args: DtoProducer | null = null) {
    this._args = args
  }

  // eslint-disable-next-line consistent-return
  public process({ type }: Process): Promise<IProducer> | undefined {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'signUp':
        return this._signUp()
    }
  }

  private async _signUp(): Promise<IProducer> {
    const { country, name, email, password } = this._args as DtoProducer

    try {
      const foundProducer = await ProducerModel.findOne({ email })

      if (foundProducer)
        throw new httpErrors.Conflict(GE.ALREADY_REGISTERED)

      const hashedPassword = crypto
        .createHash('md5')
        .update(password)
        .digest('hex')
      const producer = new ProducerModel({
        country,
        email,
        name,
        password: hashedPassword
      })

      return await producer.save()
    } catch (e) {
      return errorHandling(e, GE.INTERNAL_SERVER_ERROR)
    }
  }
}

export { Producer }
