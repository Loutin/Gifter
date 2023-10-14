const clientPostSchema = {
    "$id": "clientPostSchema",
    "type": 'object',
    "properties": {
      "name": { "type": "string" },
      "email": { "type": "string", "format": "email" },
      "phone": { "type": 'string' },
      "description": { "type": 'string' },
    },
    "required": ['description', 'phone'],
  };
  
  const clientResponseSchema = {
    "$id": 'clientResponseSchema',
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "name": { "type": "string" },
      "email": { "type": "string", "format": "email" },
      "phone": { "type": "string" },
      "description": { "type": "string" },
    },
    "required": ["id", "name", "email", "phone", "description"]
  }
  
  const clientsResponseSchema = {
    "$id": 'clientsResponseSchema',
    "type": "array",
    "items": { "$ref": "clientResponseSchema" }
  }
  
  
  const clientsSchemas = {
    clientPostSchema, clientResponseSchema, clientsResponseSchema,
  }
  
  export default clientsSchemas;