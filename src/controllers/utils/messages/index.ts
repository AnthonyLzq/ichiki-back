import { EFS } from './storer'
import { EFP } from './producer'
import { EFP as EFProducts, MFP } from './product'
import { EFW, MFW } from './warehouse'

enum GenericErrors {
  ALREADY_REGISTERED = 'That email is already registered',
  INTERNAL_SERVER_ERROR = 'Something went wrong',
  NOT_FOUND = 'Invalid credentials'
}

export { EFS, EFP, EFProducts, EFW, GenericErrors as GE, MFP, MFW }
