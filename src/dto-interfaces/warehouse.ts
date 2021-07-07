interface DtoProductAndStock {
  price  : number
  product: string
  stock  : number
}

interface DtoWarehouse {
  address?: string
  country?: string
  id?     : string
  name?   : string
  owner?  : string
  pns?    : DtoProductAndStock
}

export { DtoProductAndStock, DtoWarehouse }
