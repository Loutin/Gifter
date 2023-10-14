import pool from "../../db/db.js"


export default async function (fastify, opts) {

  const getDistributorsRouteSchema = {
    "$id": "distributorsResponsesSchema",
    summary: "Get all the distributors",
    tags: ["distributors"],
    response: {
      200: {
        description: "OK. Returns a list of all the distributors.",
        content: {
          "application/json": {
            schema: {
              "$ref": "distributorsResponseSchema"
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
    schema: getDistributorsRouteSchema,
    handler: async (request, reply) => {
      const distributors = (await pool.query("SELECT * FROM distributors")).rows
      console.log(`distributors: ${distributors}`)
      if(distributors.length === 0) {
        reply.code(204)
        return
      }

      return distributors
    }
  })
}