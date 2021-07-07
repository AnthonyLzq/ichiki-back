interface DtoProductAndStock {
  price  : number
  product: string
  stock  : number
}

interface DtoWarehouse {
  address: string
  country: string
  name   : string
  owner  : string
  pns?   : DtoProductAndStock
}

export { DtoWarehouse }
