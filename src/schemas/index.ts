import Joi from 'joi'

import { authUserSchema } from './signInUp'

const id = Joi.string().required().length(24)

export {
  authUserSchema,
  id as idSchema
}
