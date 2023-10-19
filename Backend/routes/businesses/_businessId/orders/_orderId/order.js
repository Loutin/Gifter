import pool from "../../../../../db/db.js"

export default async function (fastify, opts) {

  const orderGetRouteSchema = {
    summary: 'Get a business order by id',
    tags: ['businesses'],
    response: {
      200: {
        description: 'Ok. Returns a business order.',
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
      const businessId = request.params.businessId
      const orderId = request.params.orderId

      const order = (await pool.query("SELECT * FROM orders WHERE id_business = $1 AND id = $2", [businessId, orderId])).rows[0]

      if (!order) {
        reply.code(404)
        return
      }

      const orderDetails = (await pool.query("SELECT * FROM order_details WHERE id_order = $1", [orderId])).rows

      order.details = orderDetails

      return order
    }
  })

  const processOrderRouteSchema = {
    summary: 'Process a business order',
    tags: ['businesses'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
      404: {
        "$ref": 'generic404ResponseSchema'
      }
    },
  }

  fastify.put("/process", {
    schema: processOrderRouteSchema,
    handler: async function (request, reply) {
      const businessId = request.params.businessId
      const orderId = request.params.orderId

      const order = (await pool.query("SELECT * FROM orders WHERE id_business = $1 AND id = $2", [businessId, orderId])).rows[0]

      if (!order) {
        reply.code(404)
        return
      }

      await pool.query("UPDATE orders SET state = 'Processed' WHERE id_business = $1 AND id = $2", [businessId, orderId])

      reply.code(204)
      return
    }
  })

  const declineOrderRouteSchema = {
    summary: 'Decline a business order',
    tags: ['businesses'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
      404: {
        "$ref": 'generic404ResponseSchema'
      }
    },
  }

  fastify.put("/decline", {
    schema: declineOrderRouteSchema,
    handler: async function (request, reply) {
      const businessId = request.params.businessId
      const orderId = request.params.orderId

      const order = (await pool.query("SELECT * FROM orders WHERE id_business = $1 AND id = $2", [businessId, orderId])).rows[0]

      if (!order) {
        reply.code(404)
        return
      }

      await pool.query("UPDATE orders SET state = 'Declined' WHERE id_business = $1 AND id = $2", [businessId, orderId])

      reply.code(204)
      return
    }
  })

}