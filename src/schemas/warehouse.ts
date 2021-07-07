import Joi from 'joi'

const addWarehouse = Joi.object().keys({
  address: Joi.string().required(),
  country: Joi.string().required(),
  name   : Joi.string().required(),
  owner  : Joi.string().length(24).required()
})

export { addWarehouse }
