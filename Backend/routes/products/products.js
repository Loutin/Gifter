import pool from "../../db/db.js"

export default async function (fastify, opts) {

  const getProductsRouteSchema = {
    "$id": "productsResponsesSchema",
    summary: "Get all the products",
    tags: ["products"],
    response: {
      200: {
        description: "OK. Returns a list of all the products.",
        content: {
          "application/json": {
            schema: {
              "$ref": "productsResponseSchema"
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
    schema: getProductsRouteSchema,
    handler: async (request, reply) => {
      const products = (await pool.query("SELECT * FROM products")).rows
      console.log(`products: ${products}`)

      /* c8 ignore start */
      if(products.length === 0) {
        reply.code(204)
      }
      /* c8 ignore stop */

      return products
    }
  })

  const getProductsByTypeRouteSchema = {
    "$id": "productsByTypeResponsesSchema",
    summary: "Get all the products by type",
    tags: ["products"],
    response: {
      200: {
        description: "OK. Returns a list of all the products by type.",
        content: {
          "application/json": {
            schema: {
              "$ref": "productsResponseSchema"
            }
          }
        }
      },
      204: {
        "$ref": "generic204ResponseSchema"
      }
    }
  }

  fastify.get('/type/:type', {
    schema: getProductsByTypeRouteSchema,
    handler: async (request, reply) => {
      const type = request.params.type
      const products = (await pool.query("SELECT * FROM products WHERE type = $1", [type])).rows
      console.log(`products: ${products}`)

      /* c8 ignore start */
      if(products.length === 0) {
        reply.code(204)
      }
      /* c8 ignore stop */

      return products
    }
  })
}