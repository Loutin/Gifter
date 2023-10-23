import pool from "../../db/db.js"


export default async function (fastify, opts) {

  const postRouteSchema = {
    summary: 'Add a distributor',
    tags: ['distributors'],
    response: {
    201: {
      description: 'Ok. Successful distributor add.',
      content: {
          "application/json": {
            "schema": { $ref: "distributorResponseSchema" }
          }
        }
      }
    },
    body: {
      "$ref": 'distributorPostSchema'
    }
  }

  fastify.post("/", {
    schema: postRouteSchema,
    handler: async function (request, reply) {
      const { name, phone, availability, email, password } = request.body

      const user = (await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, password])).rows[0]
      const distributor = (await pool.query("INSERT INTO distributors (id, phone, availability) VALUES ($1, $2, $3) RETURNING *", [user.id, phone, availability])).rows[0]

      reply.code(201)
      return distributor
    }
  })

  const getDistributorsRouteSchema = {
    "$id": "distributorsResponsesSchema",
    summary: "Get all the distributors",
    tags: ["distributors"],
    response: {
      200: {
        description: "OK. Returns a list of all the distributors.",
        content: {
          "application/json": {
            schema: {
              "$ref": "distributorsResponseSchema"
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
    schema: getDistributorsRouteSchema,
    handler: async (request, reply) => {
      const distributors = (await pool.query("SELECT * FROM distributors")).rows
      console.log(`distributors: ${distributors}`)

      /* c8 ignore start */
      if(distributors.length === 0) {
        reply.code(204)
        return
      }
      /* c8 ignore stop */

      return distributors
    }
  })
}