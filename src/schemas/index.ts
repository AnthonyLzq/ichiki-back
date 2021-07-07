import Joi from 'joi'

import { signIn, signUpProducer } from './signInUp'
import { product, updateStock } from './product'

const id = Joi.string().required().length(24)

export {
  signIn,
  signUpProducer,
  product,
  updateStock,
  id as idSchema
}
