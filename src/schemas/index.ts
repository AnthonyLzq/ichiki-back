import Joi from 'joi'

import { signIn, signUpProducer } from './signInUp'
import { product } from './product'

const id = Joi.string().required().length(24)

export {
  signIn,
  signUpProducer,
  product,
  id as idSchema
}
