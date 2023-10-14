import pool from "../../db/db.js"

export default async function (fastify, opts) {

  const getClientsRouteSchema = {
    "$id": "clientsResponsesSchema",
    summary: "Get all the clients",
    tags: ["clients"],
    response: {
      200: {
        description: "OK. Returns a list of all the clients.",
        content: {
          "application/json": {
            schema: {
              "$ref": "clientsResponseSchema"
            }
          }
        }
      },
      204: {
        "$ref": "generic204ResponseSchema"
      }
    }
  }

  fastify.get('/', {
    schema: getClientsRouteSchema,
    handler: async (request, reply) => {
      const clients = (await pool.query("SELECT * FROM clients")).rows
      console.log(`clients: ${clients}`)

      if(clients.length === 0) {
        reply.code(204)
        return
      }

      return clients
    }
  })
}