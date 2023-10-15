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

  const putRouteSchema = {
    summary: 'Update a client',
    tags: ['clients'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    },
    body: {
      "$ref": 'clientPutSchema'
    }
  }

  fastify.put('/', {
    schema: putRouteSchema,
    handler: async function (request, reply) {
      const { id, name, email, phone, description, password } = request.body
      const clientId = request.params.clientId

      if (id !== Number.parseInt(clientId)) {
        reply.code(409)
        return
      }

      await pool.query("UPDATE clients SET phone = $1, description = $2 WHERE id = $3", [phone, description, clientId])

      await pool.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4", [name, email, password, clientId])

      reply.code(204)
      return
    }
  })

  const deleteRouteSchema = {
    summary: 'Delete a client',
    tags: ['clients'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    },
  }

  fastify.delete('/', {
    schema: deleteRouteSchema,
    handler: async function (request, reply) {
      const clientId = request.params.clientId

      const client = (await pool.query("SELECT * FROM clients WHERE id = $1", [clientId])).rows[0]

      if (!client) {
        reply.code(404)
        return
      }

      await pool.query("DELETE FROM clients WHERE id = $1", [clientId])

      await pool.query("DELETE FROM users WHERE id = $1", [clientId])

      reply.code(204)
      return
    }
  })
}