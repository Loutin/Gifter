import pool from "../../db/db.js"
import bcrypt from "bcryptjs"

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

      console.log("REQUEST BODY:")
      console.log(name, email, password, phone, description)

      const hashedPassword = await bcrypt.hash(password, 10)
      console.log("Type of HashedPassword is: " + typeof hashedPassword)

      const user = (await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword])).rows[0]
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

      /* c8 ignore start */
      if(clients.length === 0) {
        reply.code(204)
        return
      }
      /* c8 ignore stop */

      return clients
    }
  })
}