const productPostSchema = {
  "$id": "productPostSchema",
  "type": 'object',
  "properties": {
    "name": { "type": 'string' },
    "type": { "type": 'string' },
    "description": { "type": 'string' },
    "price": { "type": 'number' },
    "IDcompany": { "type": 'number' },
  },
  "required": ['name', 'type', 'description', 'price', 'IDcompany'],
};

const productResponseSchema = {
  "$id": 'productResponseSchema',
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": 'string' },
    "type": { "type": 'string' },
    "description": { "type": 'string' },
    "price": { "type": 'number' },
    "IDcompany": { "type": 'number' },
  },
  "required": ['id', 'name', 'type', 'description', 'price', 'IDcompany'],
}

const productsResponseSchema = {
  "$id": 'productsResponseSchema',
  "type": "array",
  "items": { "$ref": "productResponseSchema" }
}


const productsSchemas = {
  productPostSchema, productResponseSchema, productsResponseSchema,
}

export default productsSchemas;