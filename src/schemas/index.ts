import Joi from 'joi'

import { signIn, signUpProducer } from './signInUp'

const id = Joi.string().required().length(24)

export {
  signIn,
  signUpProducer,
  id as idSchema
}
