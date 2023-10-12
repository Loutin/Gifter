const orderPostSchema = {
  "$id": "orderPostSchema",
  "type": 'object',
  "properties": {
    "date": { "type": 'string' },
    "state": { "type": 'string' },
    "IDclient": { "type": 'string' },
    "description": { "type": 'string' },
    "IDcompany": { "type": 'number' },
  },
  "required": ['date', 'state', 'IDclient', 'description', 'IDcompany'],
};

const orderResponseSchema = {
  "$id": 'orderResponseSchema',
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "date": { "type": 'string' },
    "state": { "type": 'string' },
    "IDclient": { "type": 'string' },
    "description": { "type": 'string' },
    "IDcompany": { "type": 'number' },
  },
  "required": ['id', 'date', 'state', 'IDclient', 'description', 'IDcompany'],
}

const ordersResponseSchema = {
  "$id": 'ordersResponseSchema',
  "type": "array",
  "items": { "$ref": "orderResponseSchema" }
}


const ordersSchemas = {
  orderPostSchema, orderResponseSchema, ordersResponseSchema,
}

export default ordersSchemas;