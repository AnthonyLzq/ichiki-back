import Joi from 'joi'

const addWarehouse = Joi.object().keys({
  address: Joi.string().required(),
  country: Joi.string().required(),
  name   : Joi.string().required(),
  owner  : Joi.string().length(24).required()
})

const pns = Joi.object({
  product: Joi.string().length(24).required(),
  stock  : Joi.number().integer().required()
}).required()

const addProduct = Joi.object().keys({
  id: Joi.string().length(24).required(),
  pns
})

export { addWarehouse, addProduct }
