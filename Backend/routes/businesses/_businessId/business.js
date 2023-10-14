import pool from "../../../db/db.js"

export default async function (fastify, opts) {

  const getIdRouteSchema = {
    summary: 'Get a business by id',
    tags: ['businesses'],
    response: {
      200: {
        description: 'Ok. Returns a business by id.',
        content: {
          "application/json": {
            "schema": { $ref: 'businessResponseSchema' }
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
      const businessId = request.params.businessId

      const businessDetails = (await pool.query("SELECT * FROM businesses WHERE id = $1", [businessId])).rows[0]
      const userDetails = (await pool.query("SELECT * FROM users WHERE id = $1", [businessId])).rows[0]

      if (!businessDetails) {
        reply.code(404)
        return
      }

      const business = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        address: businessDetails.address,
        phone: businessDetails.phone
      }

      return business
    }
  })
}