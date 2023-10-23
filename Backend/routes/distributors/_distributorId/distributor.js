import pool from "../../../db/db.js"

export default async function (fastify, opts) {

  const getIdRouteSchema = {
    summary: 'Get a distributor by id',
    tags: ['distributors'],
    response: {
      200: {
        description: 'Ok. Returns a distributor by id.',
        content: {
          "application/json": {
            "schema": { $ref: 'distributorResponseSchema' }
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
      const distributorId = request.params.distributorId

      const distributorDetails = (await pool.query("SELECT * FROM distributors WHERE id = $1", [distributorId])).rows[0]
      const userDetails = (await pool.query("SELECT * FROM users WHERE id = $1", [distributorId])).rows[0]

      if (!distributorDetails) {
        reply.code(404)
        return
      }

      const distributor = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        phone: distributorDetails.phone,
        availability: distributorDetails.availability
      }

      return distributor
    }
  })

  const putRouteSchema = {
    summary: 'Update a distributor',
    tags: ['distributors'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    },
    body: {
      "$ref": 'distributorPutSchema'
    }
  }

  fastify.put('/', {
    schema: putRouteSchema,
    handler: async function (request, reply) {
      const { id, name, phone, availability, email, password } = request.body

      const distributorId = request.params.distributorId

      if (id !== Number.parseInt(distributorId)) {
        reply.code(409)
        return
      }

      await pool.query("UPDATE distributors SET phone = $1, availability = $2 WHERE id = $3", [phone, availability, distributorId])

      await pool.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 ", [name, email, password, distributorId])

      reply.code(204)
      return
    }
  })

  const deleteRouteSchema = {
    summary: 'Delete a distributor',
    tags: ['distributor'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    },
  }

  fastify.delete('/', {
    schema: deleteRouteSchema,
    handler: async function (request, reply) {
      const distributorId = request.params.distributorId

      const distributor = (await pool.query("SELECT * FROM distributors WHERE id = $1", [distributorId])).rows[0]

      if (!distributor) {
        reply.code(404)
        return
      }

      await pool.query("DELETE FROM distributors WHERE id = $1", [distributorId])

      await pool.query("DELETE FROM users WHERE id = $1", [distributorId])

      reply.code(204)
      return
    }
  })
}