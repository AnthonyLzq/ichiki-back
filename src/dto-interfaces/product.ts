interface DtoProduct {
  description: string
  image?     : Buffer
  name       : string
  price      : number
  producer   : string
  stock      : string
}

export { DtoProduct }
