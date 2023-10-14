import pool from "../../db/db.js"


export default async function (fastify, opts) {

  const postRouteSchema = {
    summary: 'Add a product',
    tags: ['products'],
    response: {
    201: {
      description: 'Ok. Successful product add.',
      content: {
          "application/json": {
            "schema": { $ref: "productPostSchema" }
          }
        }
      }
    },
  }

fastify.post("/", {
  schema: postRouteSchema,
  handler: async function (request, reply) {
    const { name, type, description, price, id_business } = request.body

    const product = await pool.query("INSERT INTO products (name, type, description, price, id_business) VALUES ($1, $2, $3, $4, $5) RETURNING *", [name, type, description, price, id_business])

    return product.rows[0]
  }
  })

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

      if(products.length === 0) {
        reply.code(204)
        return
      }

      return products
    }
  })
}