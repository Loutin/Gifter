import pool from "../../../db/db.js"

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

      const product = (await pool.query("SELECT * FROM products WHERE id = $1", [productId])).rows[0]

      if (!product) {
        reply.code(404)
        return
      }

      return product
    }
  })
}