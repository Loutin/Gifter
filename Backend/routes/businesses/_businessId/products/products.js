import pool from "../../../../db/db.js"


export default async function (fastify, opts) {

  const postRouteSchema = {
    summary: 'Add a product',
    tags: ['products'],
    response: {
    201: {
      description: 'Ok. Successful product add.',
      content: {
          "application/json": {
            "schema": { $ref: "productResponseSchema" }
          }
        }
      }
    },
    body: {
      "$ref": 'productPostSchema'
    }
  }

  fastify.post("/", {
    schema: postRouteSchema,
    handler: async function (request, reply) {
      const { name, type, description, price, id_business } = request.body

      const businessId = request.params.businessId

      if(id_business !== Number.parseInt(businessId)) {
        reply.code(409)
        return
      }

      const product = (await pool.query("INSERT INTO products (name, type, description, price, id_business) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, type, description, price, id_business])).rows[0]

      reply.code(201)
      return product
    }
  })

  const getProductsRouteSchema = {
    "$id": "productsResponsesSchema",
    summary: "Get all the products",
    tags: ["products"],
    response: {
      200: {
        description: "OK. Returns a list of all the products of the business.",
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

      const businessId = request.params.businessId

      const products = (await pool.query("SELECT * FROM products WHERE id_business = $1", [businessId])).rows
      console.log(`products: ${products}`)

      /* c8 ignore start */
      if(products.length === 0) {
        reply.code(204)
        return
      }
      /* c8 ignore stop */

      return products
    }
  })
}