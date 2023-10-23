import pool from "../../../../db/db.js"

export default async function (fastify, opts) {

  const ordersGetRouteSchema = {
    summary: 'Get a business orders',
    tags: ['businesses'],
    response: {
      200: {
        description: 'Ok. Returns a business orders.',
        content: {
          "application/json": {
            "schema": { $ref: 'ordersResponseSchema' }
          }
        }
      },
      204: {
        "$ref": 'generic204ResponseSchema'
      }
    },
  }

  fastify.get("/", {
    schema: ordersGetRouteSchema,
    handler: async function (request, reply) {
      const businessId = request.params.businessId

      const orders = (await pool.query("SELECT * FROM orders WHERE id_business = $1", [businessId])).rows

      /* c8 ignore start */
      if (orders.length === 0) {
        reply.code(204)
        return
      }
      /* c8 ignore stop */

      for (let i = 0; i < orders.length; i++) {
        const orderDetails = (await pool.query("SELECT * FROM order_details WHERE id_order = $1", [orders[i].id])).rows

        orders[i].details = orderDetails
      }

      return orders
    }
  })
}