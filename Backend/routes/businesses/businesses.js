import pool from "../../db/db.js"


export default async function (fastify, opts) {

  const getBusinessesRouteSchema = {
    "$id": "businessesResponsesSchema",
    summary: "Get all the businesses",
    tags: ["businesses"],
    response: {
      200: {
        description: "OK. Returns a list of all the businesses.",
        content: {
          "application/json": {
            schema: {
              "$ref": "businessesResponseSchema"
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
    schema: getBusinessesRouteSchema,
    handler: async (request, reply) => {
      const businesses = (await pool.query("SELECT * FROM businesses")).rows
      console.log(`businesses: ${businesses}`)

      if(businesses.length === 0) {
        reply.code(204)
      }

      return businesses
    }
  })
}