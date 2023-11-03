import pool from "../../db/db.js"
import bcrypt from "bcryptjs"

export default async function (fastify, opts) {

  const postLoginRouteSchema = {
    summary: 'Login',
    tags: ['users'],
    response: {
      200: {
        description: 'Ok. Successful login.',
        content: {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "integer"
                },
                "name": {
                  "type": "string"
                },
                "email": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      404: {
        "$ref": "generic404ResponseSchema"
      },
      403: {
        description: 'Forbidden. Invalid credentials.',
        content: {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    body: {
      type: "object",
      properties: {
        "email": {
          type: "string"
        },
        "password": {
          type: "string"
        }
      }
    }
  }

  fastify.post("/login", {
    schema: postLoginRouteSchema,
    handler: async function (request, reply) {

      const { email, password } = request.body

      const user = (await pool.query("SELECT * FROM users WHERE email = $1", [email])).rows[0]

      if (!user) {
        reply.code(404)
        return
      }

      const isEqual = await bcrypt.compare(password, user.password)

      if (!isEqual) {
        reply.code(403)
        return {
          message: "Invalid credentials"
        }
      }

      reply.code(200)
      return {
        id: user.id,
        name: user.name,
        email: user.email
      }

    }
  })

}

