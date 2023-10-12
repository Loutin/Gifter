const businessPostSchema = {
  "$id": "businessPostSchema",
  "type": 'object',
  "properties": {
    "name": { "type": 'string' },
    "email": { "type": 'string', "format": "email" },
    "password": { "type": 'string' },
    "address": { "type": 'string' },
    "phone": { "type": 'string' },
  },
  "required": ['name', 'email', 'password', 'address', 'phone'],
};

const businessResponseSchema = {
  "$id": 'businessResponseSchema',
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "address": { "type": "string" },
    "phone": { "type": "string" },
  },
  "required": ["id", "name", "email", "address", "phone"]
}

const businessesResponseSchema = {
  "$id": 'businessesResponseSchema',
  "type": "array",
  "items": { "$ref": "businessResponseSchema" }
}


const businessesSchemas = {
  businessPostSchema, businessResponseSchema, businessesResponseSchema,
}

export default businessesSchemas;