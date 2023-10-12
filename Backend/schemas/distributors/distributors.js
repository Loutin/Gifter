const distributorPostSchema = {
    "$id": "distributorPostSchema",
    "type": 'object',
    "properties": {
      "name": { "type": 'string' },
      "email": { "type": 'string', "format": "email" },
      "password": { "type": 'string' },
      "availability": { "type": 'string' },
      "phone": { "type": 'string' },
    },
    "required": ['name', 'email', 'password', 'availability', 'phone'],
  };
  
  const distributorResponseSchema = {
    "$id": 'distributorResponseSchema',
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "name": { "type": "string" },
      "email": { "type": "string", "format": "email" },
      "availability": { "type": "string" },
      "phone": { "type": "string" },
    },
    "required": ["id", "name", "email", "availability", "phone"]
  }
  
  const distributorsResponseSchema = {
    "$id": 'distributorsResponseSchema',
    "type": "array",
    "items": { "$ref": "distributorResponseSchema" }
  }
  
  
  const distributorsSchemas = {
    distributorPostSchema, distributorResponseSchema, distributorsResponseSchema,
  }
  
  export default distributorsSchemas;