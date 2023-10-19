import pool from "../../../../../db/db.js"

export default async function (fastify, opts) {

  const orderGetRouteSchema = {
    summary: 'Get a client order by id',
    tags: ['clients'],
    response: {
      200: {
        description: 'Ok. Returns a client order.',
        content: {
          "application/json": {
            "schema": { $ref: "orderResponseSchema" }
          }
        }
      },
      404: {
        "$ref": 'generic404ResponseSchema'
      }
    },
  }

  fastify.get("/", {
    schema: orderGetRouteSchema,
    handler: async function (request, reply) {
      const clientId = request.params.clientId
      const orderId = request.params.orderId

      const order = (await pool.query("SELECT * FROM orders WHERE id_client = $1 AND id = $2", [clientId, orderId])).rows[0]

      if (!order) {
        reply.code(404)
        return
      }

      const orderDetails = (await pool.query("SELECT * FROM order_details WHERE id_order = $1", [orderId])).rows

      order.details = orderDetails

      return order
    }
  })

  const cancelOrderRouteSchema = {
    summary: 'Cancel a client order',
    tags: ['clients'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
      404: {
        "$ref": 'generic404ResponseSchema'
      }
    },
  }

  fastify.put("/cancel", {
    schema: cancelOrderRouteSchema,
    handler: async function (request, reply) {
      const clientId = request.params.clientId
      const orderId = request.params.orderId

      const order = (await pool.query("SELECT * FROM orders WHERE id_client = $1 AND id = $2", [clientId, orderId])).rows[0]

      if (!order) {
        reply.code(404)
        return
      }

      await pool.query("UPDATE orders SET state = 'Cancelled' WHERE id_client = $1 AND id = $2", [clientId, orderId])

      reply.code(204)
      return
    }
  })

}