import pool from "../../../db/db.js"

export default async function (fastify, opts) {

  const getIdRouteSchema = {
    summary: 'Get a client by id',
    tags: ['clients'],
    response: {
      200: {
        description: 'Ok. Returns a client by id.',
        content: {
          "application/json": {
            "schema": { $ref: 'clientResponseSchema' }
          }
        }
      },
      404: {
        "$ref": 'generic404ResponseSchema'
      }
    },
  }

  fastify.get('/', {
    schema: getIdRouteSchema,
    handler: async (request, reply) => {

      const clientId = request.params.clientId

      const clientDetails = (await pool.query("SELECT * FROM clients WHERE id = $1", [clientId])).rows[0]
      const userDetails = (await pool.query("SELECT * FROM users WHERE id = $1", [clientId])).rows[0]

      if (!clientDetails) {
        reply.code(404)
        return
      }

      const client = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        phone: clientDetails.phone,
        description: clientDetails.description
      }

      return client
    }
  })
}