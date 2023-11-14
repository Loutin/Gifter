const userResponseSchema = {
  "$id": "userResponseSchema",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
  }
}

const usersSchemas = {
  userResponseSchema
}

export default usersSchemas