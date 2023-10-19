import pool from "../../../../db/db.js"

export default async function (fastify, opts) {

  const processedOrdersGetRouteSchema = {
    summary: 'Get all processed orders',
    tags: ['distributors'],
    response: {
      200: {
        description: 'Ok. Returns a list of processed orders.',
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

  fastify.get("/processed", {
    schema: processedOrdersGetRouteSchema,
    handler: async function (request, reply) {
      const orders = (await pool.query("SELECT * FROM orders WHERE state = 'Processed'")).rows

      if (orders.length === 0) {
        reply.code(204)
        return
      }

      for (let i = 0; i < orders.length; i++) {
        orders[i].details = (await pool.query("SELECT * FROM order_details WHERE id_order = $1", [orders[i].id])).rows
      }

      return orders
    }
  })

  const processedOrdersAcceptPostRouteSchema = {
    summary: 'Accept a processed order',
    tags: ['distributors'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
      404: {
        "$ref": 'generic404ResponseSchema'
      }
    },
  }

  fastify.post("/processed/:orderId/accept", {
    schema: processedOrdersAcceptPostRouteSchema,
    handler: async function (request, reply) {
      const orderId = request.params.orderId
      const distributorId = request.params.distributorId
      const date = new Date()
      const state = 'Pending'

      const order = (await pool.query("SELECT * FROM orders WHERE id = $1", [orderId])).rows[0]

      if (!order) {
        reply.code(404)
        return
      }

      await pool.query("UPDATE orders SET state = 'Delivering' WHERE id = $1", [orderId])

      await pool.query("INSERT INTO deliveries (id_distributor, id_order, date, state) VALUES ($1, $2, $3, $4)", [distributorId, orderId, date, state])

      reply.code(204)
      return
    }
  })

  const deliveriesGetRouteSchema = {
    summary: 'Get a distributor deliveries',
    tags: ['distributors'],
    response: {
      200: {
        description: 'Ok. Returns a distributor deliveries.',
        content: {
          "application/json": {
            "schema": { $ref: 'deliveriesResponseSchema' }
          }
        }
      },
      204: {
        "$ref": 'generic204ResponseSchema'
      }
    },
  }

  fastify.get("/", {
    schema: deliveriesGetRouteSchema,
    handler: async function (request, reply) {
      const distributorId = request.params.distributorId

      const deliveries = (await pool.query("SELECT * FROM deliveries WHERE id_distributor = $1", [distributorId])).rows

      if (deliveries.length === 0) {
        reply.code(204)
        return
      }

      return deliveries
    }
  })

}