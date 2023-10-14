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
}