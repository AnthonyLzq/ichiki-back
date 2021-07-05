import { EFS } from './storer'
import { EFP } from './producer'

enum GenericErrors {
  ALREADY_REGISTERED = 'That email is already registered',
  INTERNAL_SERVER_ERROR = 'Something went wrong',
  NOT_FOUND = 'Invalid credentials'
}

export { EFS, EFP, GenericErrors as GE }
