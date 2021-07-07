enum ErrorForProducts {
  ALREADY_REGISTERED = 'That product is already registered',
  NOTHING_TO_UPDATE = 'The value to update can not be 0',
  NOT_ENOUGH = 'Not enough stock. Do you want to delete the product?',
  NOT_FOUND = 'That product does not exists'
}

enum MessagesForProducts {
  REMOVE_SUCCESS = 'The product was successfully removed',
  STOCK_UPDATE_SUCCESS = 'The stock was successfully updated'
}

export { ErrorForProducts as EFP, MessagesForProducts as MFP }
