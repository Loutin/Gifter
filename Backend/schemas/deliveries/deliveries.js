const deliveryPostSchema = {
  "$id": "deliveryPostSchema",
  "type": 'object',
  "properties": {
    "date": { "type": 'string' },
    "state": { "type": 'string' },
    "id_distributor": { "type": 'number' },
    "id_order": { "type": 'number' },
  },
  "required": ['date', 'state', 'id_distributor', 'id_order'],
}

const deliveryResponseSchema = {
  "$id": 'deliveryResponseSchema',
  "type": 'object',
  "properties": {
    "id": { "type": "integer" },
    "date": { "type": 'string' },
    "state": { "type": 'string' },
    "id_distributor": { "type": 'number' },
    "id_order": { "type": 'number' },
  },
  "required": ['id', 'date', 'state', 'id_distributor', 'id_order'],
}

const deliveriesResponseSchema = {
  "$id": 'deliveriesResponseSchema',
  "type": "array",
  "items": { "$ref": "deliveryResponseSchema" }
}


const deliveriesSchemas = {
  deliveryPostSchema, deliveryResponseSchema, deliveriesResponseSchema
}

export default deliveriesSchemas;