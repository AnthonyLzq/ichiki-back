import { Document, model, Schema, Types } from 'mongoose'

interface IProductAndStock extends Document {
  price  : number
  product: Types.ObjectId
  stock  : number
}

interface IWarehouse extends Document {
  address: string
  country: string
  name   : string
  owner  : Types.ObjectId
  pns    : IProductAndStock
}

const ProductAndStock = new Schema(
  {
    price: {
      required: true,
      type    : Number
    },
    product: {
      ref     : 'products',
      required: true,
      type    : Types.ObjectId
    },
    stock: {
      integer : true,
      required: true,
      type    : Number
    }
  },
  {
    _id       : false,
    timestamps: {
      createdAt: false,
      updatedAt: true
    }
  }
)

const Warehouse = new Schema(
  {
    address: {
      required: true,
      type    : String
    },
    country: {
      required: true,
      type    : String
    },
    name: {
      required: true,
      type    : String,
      unique  : true
    },
    owner: {
      ref     : 'storers',
      required: true,
      type    : Types.ObjectId
    },
    pns: [ProductAndStock]
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: true
    }
  }
)

const WarehouseModel = model<IWarehouse>('warehouses', Warehouse)

export { IWarehouse, WarehouseModel }
