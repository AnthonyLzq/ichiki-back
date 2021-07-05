import { Document, model, Schema } from 'mongoose'

interface IProducer extends Document {
  country : string
  email   : string
  name    : string
  password: string
}

const Producer = new Schema(
  {
    country: {
      required: true,
      type    : String
    },
    email: {
      required: true,
      type    : String,
      unique  : true
    },
    name: {
      required: true,
      type    : String
    },
    password: {
      required: true,
      type    : String
    }
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: true
    }
  }
)

const ProducerModel = model<IProducer>('producers', Producer)

export { IProducer, ProducerModel }
