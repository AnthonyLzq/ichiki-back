import Joi from 'joi'

const product = Joi.object().keys({
  description: Joi.string().required(),
  image      : Joi.binary(),
  name       : Joi.string().required(),
  price      : Joi.number().required(),
  producer   : Joi.string().length(24).required(),
  stock      : Joi.number().integer().required()
})

export { product }
