const clientPostSchema = {
    "$id": "clientPostSchema",
    "type": 'object',
    "properties": {
      "name": { "type": "string" },
      "email": { "type": "string", "format": "email" },
      "phone": { "type": 'string' },
      "description": { "type": 'string' },
      "password": { "type": 'string' },
    },
    "required": ['name', 'email', 'password', 'phone', 'description'],
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
    "required": ["id", "phone", "description"]
  }
  
  const clientsResponseSchema = {
    "$id": 'clientsResponseSchema',
    "type": "array",
    "items": { "$ref": "clientResponseSchema" }
  }
  
  const clientPutSchema = {
    "$id": "clientPutSchema",
    "type": 'object',
    "properties": {
      "id": { "type": "integer" },
      "name": { "type": "string" },
      "email": { "type": "string", "format": "email" },
      "phone": { "type": "string" },
      "description": { "type": "string" },
      "password": { "type": "string" },
    }
  }
  
  const clientsSchemas = {
    clientPostSchema, clientResponseSchema, clientsResponseSchema, clientPutSchema
  }
  
  export default clientsSchemas;