const clientPostSchema = {
    "$id": "clientPostSchema",
    "type": 'object',
    "properties": {
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
      "phone": { "type": "string" },
      "description": { "type": "string" },
    },
    "required": ["id","phone", "description"]
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