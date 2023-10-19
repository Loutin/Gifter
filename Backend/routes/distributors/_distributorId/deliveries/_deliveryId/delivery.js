import pool from "../../../../../db/db.js"

export default async function (fastify, opts) {

  const deliveryGetRouteSchema = {
    summary: 'Get a distributor delivery by id',
    tags: ['distributors'],
    response: {
      200: {
        description: 'Ok. Returns a distributor delivery by id.',
        content: {
          "application/json": {
            "schema": { $ref: 'deliveryResponseSchema' }
          }
        }
      },
      404: {
        "$ref": 'generic404ResponseSchema'
      }
    },
  }

  fastify.get("/", {
    schema: deliveryGetRouteSchema,
    handler: async function (request, reply) {
      const distributorId = request.params.distributorId
      const deliveryId = request.params.deliveryId

      const delivery = (await pool.query("SELECT * FROM deliveries WHERE id_distributor = $1 AND id = $2", [distributorId, deliveryId])).rows[0]

      if (!delivery) {
        reply.code(404)
        return
      }

      return delivery
    }
  })

  const deliveryInProgressPutRouteSchema = {
    summary: 'Update a distributor delivery to in progress',
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

  fastify.put("/in-progress", {
    schema: deliveryInProgressPutRouteSchema,
    handler: async function (request, reply) {
      const distributorId = request.params.distributorId
      const deliveryId = request.params.deliveryId

      const delivery = (await pool.query("SELECT * FROM deliveries WHERE id_distributor = $1 AND id = $2", [distributorId, deliveryId])).rows[0]

      if (!delivery) {
        reply.code(404)
        return
      }

      await pool.query("UPDATE deliveries SET state = 'InProgress' WHERE id_distributor = $1 AND id = $2", [distributorId, deliveryId])

      reply.code(204)
      return
    }
  })

  const deliveryDeliveredPutRouteSchema = {
    summary: 'Update a distributor delivery to delivered',
    tags: ['distributors'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
      404: {
        "$ref": 'generic404ResponseSchema'
      }
    }
  }

  fastify.put("/delivered", {
    schema: deliveryDeliveredPutRouteSchema,
    handler: async function (request, reply) {
      const distributorId = request.params.distributorId
      const deliveryId = request.params.deliveryId

      const delivery = (await pool.query("SELECT * FROM deliveries WHERE id_distributor = $1 AND id = $2", [distributorId, deliveryId])).rows[0]

      if (!delivery) {
        reply.code(404)
        return
      }

      await pool.query("UPDATE deliveries SET state = 'Delivered' WHERE id_distributor = $1 AND id = $2", [distributorId, deliveryId])

      await pool.query("UPDATE orders SET state = 'Delivered' WHERE id = $1", [delivery.id_order])

      reply.code(204)
      return
    }
  })

}