import pool from "../../db/db.js"

export default async function (fastify, opts) {

  const postRouteSchema = {
    summary: 'Add a client',
    tags: ['clients'],
    response: {
    201: {
      description: 'Ok. Successful client add.',
      content: {
          "application/json": {
            "schema": { $ref: "clientResponseSchema" }
          }
        }
      }
    },
    body: {
      "$ref": 'clientPostSchema'
    }
  }

  fastify.post("/", {
    schema: postRouteSchema,
    handler: async function (request, reply) {
      const { name, email, password, phone, description } = request.body

      const user = (await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password])).rows[0]
      const client = (await pool.query("INSERT INTO clients (id, phone, description) VALUES ($1, $2, $3) RETURNING *", [user.id, phone, description])).rows[0]

      reply.code(201)
      return client
    }
  })

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