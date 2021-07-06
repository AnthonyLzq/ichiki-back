import Joi from 'joi'

const product = Joi.object({
  description: Joi.string().required(),
  name       : Joi.string().required(),
  price      : Joi.number().required(),
  producer   : Joi.string().length(24).required(),
  stock      : Joi.number().integer().required()
})

export { product }
