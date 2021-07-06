import { Document, model, Schema, Types } from 'mongoose'

interface IProduct extends Document {
  description: string
  image      : Buffer
  name       : string
  price      : number
  producer   : Types.ObjectId
  stock      : number
}

const Product = new Schema(
  {
    description: {
      required: true,
      type    : String
    },
    image: Buffer,
    name : {
      required: true,
      type    : String
    },
    price: {
      required: true,
      type    : Number
    },
    producer: {
      required: true,
      type    : Types.ObjectId
    },
    stock: {
      integer : true,
      required: true,
      type    : Number,
      validate: {
        message  : '{VALUE} is not integer value',
        validator: Number.isInteger
      }
    }
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: true
    }
  }
)

const ProductModel = model<IProduct>('products', Product)

export { IProduct, ProductModel }
