import pool from "../../db/db.js"
import bcrypt from "bcryptjs"

export default async function (fastify, opts) {

  const postRouteSchema = {
    summary: 'Add a business',
    tags: ['businesses'],
    response: {
    201: {
      description: 'Ok. Successful business add.',
      content: {
          "application/json": {
            "schema": { $ref: "businessResponseSchema" }
          }
        }
      }
    },
    body: {
      "$ref": 'businessPostSchema'
    }
  }

  fastify.post("/", {
    schema: postRouteSchema,
    handler: async function (request, reply) {
      const { name, phone, address, email, password } = request.body

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = (await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword])).rows[0]

      const business = (await pool.query("INSERT INTO businesses (id, phone, address) VALUES ($1, $2, $3) RETURNING *", [user.id, phone, address])).rows[0]

      reply.code(201)
      return business
    }
  })

  const getBusinessesRouteSchema = {
    "$id": "businessesResponsesSchema",
    summary: "Get all the businesses",
    tags: ["businesses"],
    response: {
      200: {
        description: "OK. Returns a list of all the businesses.",
        content: {
          "application/json": {
            schema: {
              "$ref": "businessesResponseSchema"
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
    schema: getBusinessesRouteSchema,
    handler: async (request, reply) => {
      const businesses = (await pool.query("SELECT * FROM businesses")).rows
      console.log(`businesses: ${businesses}`)

      /* c8 ignore start */
      if(businesses.length === 0) {
        reply.code(204)
      }
      /* c8 ignore stop */

      return businesses
    }
  })
}