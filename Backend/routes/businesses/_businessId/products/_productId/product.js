import pool from "../../../../../db/db.js"

export default async function (fastify, opts) {

  const getIdRouteSchema = {
    summary: 'Get a product by id',
    tags: ['products'],
    response: {
      200: {
        description: 'Ok. Returns a product by id.',
        content: {
          "application/json": {
            "schema": { $ref: 'productResponseSchema' }
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
      const productId = request.params.productId

      const businessId = request.params.businessId

      const product = (await pool.query("SELECT * FROM products WHERE id = $1 AND id_business = $2", [productId, businessId])).rows[0]

      if (!product) {
        reply.code(404)
        return
      }

      return product
    }
  })

  const putRouteSchema = {
    summary: 'Update a product',
    tags: ['products'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    },
    body: {
      "$ref": 'productResponseSchema'
    }
  }

  fastify.put('/', {
    schema: putRouteSchema,
    handler: async function (request, reply) {
      const { id, name, type, image, description, price, id_business } = request.body
      const productId = request.params.productId
      const businessId = request.params.businessId

      if (id !== Number.parseInt(productId) || id_business !== Number.parseInt(businessId)) {
        reply.code(409)
        return
      }

      (await pool.query("UPDATE products SET name = $1, type = $2, image = $3, description = $4, price = $5, id_business = $6 WHERE id = $7", [name, type, image, description, price, id_business, productId])).rows[0]

      reply.code(204)
      return
    }
  })

  const deleteRouteSchema = {
    summary: 'Delete a product',
    tags: ['products'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    },
  }

  fastify.delete('/', {
    schema: deleteRouteSchema,
    handler: async function (request, reply) {
      const productId = request.params.productId

      const businessId = request.params.businessId

      const product = (await pool.query("SELECT * FROM products WHERE id = $1 AND id_business = $2", [productId, businessId])).rows[0]

      if (!product) {
        reply.code(404)
        return
      }

      await pool.query("DELETE FROM products WHERE id = $1 AND id_business = $2", [productId, businessId])

      reply.code(204)
      return
    }
  })
}