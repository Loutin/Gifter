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

  const putRouteSchema = {
    summary: 'Update a business',
    tags: ['businesses'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    },
    body: {
      "$ref": 'businessPutSchema'
    }
  }

  fastify.put('/', {
    schema: putRouteSchema,
    handler: async function (request, reply) {
      const { id, name, address, phone, email, password } = request.body
      const businessId = request.params.businessId

      if (id !== Number.parseInt(businessId)) {
        reply.code(409)
        return
      }

      await pool.query("UPDATE businesses SET address = $1, phone = $2 WHERE id = $3", [address, phone, businessId])

      await pool.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4", [name, email, password, businessId])

      reply.code(204)
      return
    }
  })

  const deleteRouteSchema = {
    summary: 'Delete a business',
    tags: ['businesses'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    },
  }

  fastify.delete('/', {
    schema: deleteRouteSchema,
    handler: async function (request, reply) {
      const businessId = request.params.businessId

      const business = (await pool.query("SELECT * FROM businesses WHERE id = $1", [businessId])).rows[0]

      if (!business) {
        reply.code(404)
        return
      }

      await pool.query("DELETE FROM businesses WHERE id = $1", [businessId])

      await pool.query("DELETE FROM users WHERE id = $1", [businessId])

      reply.code(204)
      return
    }
  })
}