import Joi from 'joi'

import { signIn, signUpProducer } from './signInUp'
import { product, updateStock } from './product'
import { addWarehouse } from './warehouse'

const id = Joi.string().required().length(24)

export {
  signIn,
  signUpProducer,
  product,
  updateStock,
  addWarehouse,
  id as idSchema
}
