import pool from "../../../../db/db.js"

export default async function (fastify, opts) {

  const ordersGetRouteSchema = {
    summary: 'Get a client orders',
    tags: ['clients'],
    response: {
      200: {
        description: 'Ok. Returns a client orders.',
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
      const clientId = request.params.clientId

      const orders = (await pool.query("SELECT * FROM orders WHERE id_client = $1", [clientId])).rows

      if (orders.length === 0) {
        reply.code(204)
        return
      }

      for (let i = 0; i < orders.length; i++) {
        const orderDetails = (await pool.query("SELECT * FROM order_details WHERE id_order = $1", [orders[i].id])).rows

        orders[i].details = orderDetails
      }

      return orders
    }
  })

  const orderPostRouteSchema = {
    summary: 'Add a client order',
    tags: ['clients'],
    response: {
      201: {
        description: 'Ok. Successful client order.',
        content: {
          "application/json": {
            "schema": { $ref: "orderResponseSchema" }
          }
        }
      },
    },
    body: {
      "$ref": 'orderPostSchema'
    }
  }

  fastify.post("/", {
    schema: orderPostRouteSchema,
    handler: async function (request, reply) {
      const { date, state, id_client, description, id_business, details } = request.body

      const clientId = request.params.clientId

      if(id_client !== Number.parseInt(clientId)) {
        reply.code(409)
        return
      }

      const order = (await pool.query("INSERT INTO orders (date, state, id_client, description, id_business) VALUES ($1, $2, $3, $4, $5) RETURNING *", [date, state, id_client, description, id_business])).rows[0]

      for (let i = 0; i < details.length; i++) {
        await pool.query("INSERT INTO order_details (id_order, id_product, quantity) VALUES ($1, $2, $3)", [order.id, details[i].id_product, details[i].quantity])
      }

      const orderDetails = (await pool.query("SELECT id_product, quantity FROM order_details WHERE id_order = $1", [order.id])).rows

      order.details = orderDetails

      reply.code(201)
      return order
    }
  })

}