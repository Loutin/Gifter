const orderDetail = {
  "$id": "orderDetail",
  "type": "object",
  "properties": {
    "id_product": { "type": "integer" },
    "quantity": { "type": "integer" },
  },
  "required": ["id_product", "quantity"],
}

const orderDetails = {
  "$id": "orderDetails",
  "type": "array",
  "items": { "$ref": "orderDetail" }
}

const orderPostSchema = {
  "$id": "orderPostSchema",
  "type": 'object',
  "properties": {
    "date": { "type": 'string' },
    "state": { "type": 'string' },
    "id_client": { "type": 'number' },
    "description": { "type": 'string' },
    "id_business": { "type": 'number' },
    "details": { "$ref": "orderDetails" },
  },
  "required": ['date', 'state', 'id_client', 'description', 'id_business', 'details'],
}

const orderResponseSchema = {
  "$id": 'orderResponseSchema',
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "date": { "type": 'string' },
    "state": { "type": 'string' },
    "id_client": { "type": 'number' },
    "description": { "type": 'string' },
    "id_business": { "type": 'number' },
    "details": { "$ref": "orderDetails" },
  },
  "required": ['id', 'date', 'state', 'id_client', 'description', 'id_business', 'details'],
}

const ordersResponseSchema = {
  "$id": 'ordersResponseSchema',
  "type": "array",
  "items": { "$ref": "orderResponseSchema" }
}


const ordersSchemas = {
  orderPostSchema, orderResponseSchema, ordersResponseSchema, orderDetail, orderDetails
}

export default ordersSchemas;