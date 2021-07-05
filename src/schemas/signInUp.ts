import Joi from 'joi'

const signIn = Joi.object().keys({
  email   : Joi.string().required().email(),
  password: Joi.string().required()
})

const signUpProducer = signIn.keys({
  country: Joi.string().required(),
  name   : Joi.string().required()
})

export {
  signIn,
  signUpProducer
}
