import { Document, model, Schema, Types } from 'mongoose'

interface IStorer extends Document {
  email       : string
  name        : string
  password    : string
  warehouseIds: string[]
}

const Storer = new Schema(
  {
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
    },
    warehouseIds: [Types.ObjectId]
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: true
    }
  }
)

const StorerModel = model<IStorer>('storers', Storer)

export { IStorer, StorerModel }
