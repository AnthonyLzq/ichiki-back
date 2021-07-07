enum ErrorForWarehouse {
  ALREADY_REGISTER = 'That warehouse is already registered',
  NO_PRODUCT_LEFT = 'The requested product does not have any stock',
  PRODUCT_NOT_ENOUGH = 'The requested product does not have enough stock',
  PRODUCT_NOT_FOUND = 'The requested product does not exists',
  STOCK_0 = 'The stock to buy can not be 0',
  STOCK_NEGATIVE = 'The stock can not be negative',
  WAREHOUSE_NOT_FOUND = 'The requested warehouse does no exists'
}

enum MessageForWarehouse {
  REMOVE_SUCCESS = 'Warehouse successfully removed'
}

export { ErrorForWarehouse as EFW, MessageForWarehouse as MFW }
