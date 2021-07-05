import Joi from 'joi'

const authUserSchema = Joi.object({
  email   : Joi.string().required().email(),
  password: Joi.string().required()
})

export {
  authUserSchema
}
