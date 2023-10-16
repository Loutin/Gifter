import pool from "../../../db/db.js"

export default async function (fastify, opts) {

  const getIdRouteSchema = {
    summary: 'Get a client by id',
    tags: ['clients'],
    response: {
      200: {
        description: 'Ok. Returns a client by id.',
        content: {
          "application/json": {
            "schema": { $ref: 'clientResponseSchema' }
          }
        }
      },
      404: {
        "$ref": 'generic404ResponseSchema'
      }
    },
  }

  fastify.get('/', {
    schema: getIdRouteSchema,
    handler: async (request, reply) => {

      const clientId = request.params.clientId

      const clientDetails = (await pool.query("SELECT * FROM clients WHERE id = $1", [clientId])).rows[0]
      const userDetails = (await pool.query("SELECT * FROM users WHERE id = $1", [clientId])).rows[0]

      if (!clientDetails) {
        reply.code(404)
        return
      }

      const client = {
        id: userDetails.id,
        name: userDetails.name,
        email: userDetails.email,
        phone: clientDetails.phone,
        description: clientDetails.description
      }

      return client
    }
  })

  const putRouteSchema = {
    summary: 'Update a client',
    tags: ['clients'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    },
    body: {
      "$ref": 'clientPutSchema'
    }
  }

  fastify.put('/', {
    schema: putRouteSchema,
    handler: async function (request, reply) {
      const { id, name, email, phone, description, password } = request.body
      const clientId = request.params.clientId

      if (id !== Number.parseInt(clientId)) {
        reply.code(409)
        return
      }

      await pool.query("UPDATE clients SET phone = $1, description = $2 WHERE id = $3", [phone, description, clientId])

      await pool.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4", [name, email, password, clientId])

      reply.code(204)
      return
    }
  })

  const deleteRouteSchema = {
    summary: 'Delete a client',
    tags: ['clients'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    },
  }

  fastify.delete('/', {
    schema: deleteRouteSchema,
    handler: async function (request, reply) {
      const clientId = request.params.clientId

      const client = (await pool.query("SELECT * FROM clients WHERE id = $1", [clientId])).rows[0]

      if (!client) {
        reply.code(404)
        return
      }

      await pool.query("DELETE FROM clients WHERE id = $1", [clientId])

      await pool.query("DELETE FROM users WHERE id = $1", [clientId])

      reply.code(204)
      return
    }
  })

  const favoriteProductsGetRouteSchema = {
    summary: 'Get a client favorite products',
    tags: ['clients'],
    response: {
      200: {
        description: 'Ok. Returns a client favorite products.',
        content: {
          "application/json": {
            "schema": { $ref: 'clientFavoriteProductsResponseSchema' }
          }
        }
      },
      204: {
        "$ref": 'generic204ResponseSchema'
      }
    },
  }

  fastify.get("/favorite-products", {
    schema: favoriteProductsGetRouteSchema,
    handler: async function (request, reply) {
      const clientId = request.params.clientId

      const res = (await pool.query("SELECT * FROM favorite_products WHERE id_client = $1", [clientId])).rows

      if (res.length === 0) {
        reply.code(204)
        return
      }

      const favoriteProducts = []

      for (let i = 0; i < res.length; i++) {
        const product = (await pool.query("SELECT * FROM products WHERE id = $1", [res[i].id_product])).rows[0]

        favoriteProducts.push(product)
      }

      return favoriteProducts
    }
  })

  const favoriteProductsPostRouteSchema = {
    summary: 'Add a client favorite product',
    tags: ['clients'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    }
  }

  fastify.post("/favorite-products/:productId", {
    schema: favoriteProductsPostRouteSchema,
    handler: async function (request, reply) {
      const clientId = request.params.clientId
      const productId = request.params.productId

      await pool.query("INSERT INTO favorite_products (id_client, id_product) VALUES ($1, $2)", [clientId, productId])

      reply.code(204)
      return
    }
  })

  const favoriteProductsDeleteRouteSchema = {
    summary: 'Delete a client favorite product',
    tags: ['clients'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    }
  }

  fastify.delete("/favorite-products/:productId", {
    schema: favoriteProductsDeleteRouteSchema,
    handler: async function (request, reply) {
      const clientId = request.params.clientId
      const productId = request.params.productId

      await pool.query("DELETE FROM favorite_products WHERE id_client = $1 AND id_product = $2", [clientId, productId])

      reply.code(204)
      return
    }
  })

  const favoriteBusinessesGetRouteSchema = {
    summary: 'Get a client favorite businesses',
    tags: ['clients'],
    response: {
      200: {
        description: 'Ok. Returns a client favorite businesses.',
        content: {
          "application/json": {
            "schema": { $ref: 'clientFavoriteBusinessesResponseSchema' }
          }
        }
      },
      204: {
        "$ref": 'generic204ResponseSchema'
      }
    },
  }

  fastify.get("/favorite-businesses", {
    schema: favoriteBusinessesGetRouteSchema,
    handler: async function (request, reply) {
      const clientId = request.params.clientId

      const res = (await pool.query("SELECT * FROM favorite_businesses WHERE id_client = $1", [clientId])).rows

      if (res.length === 0) {
        reply.code(204)
        return
      }

      const favoriteBusinesses = []

      for (let i = 0; i < res.length; i++) {
        const business = (await pool.query("SELECT * FROM businesses WHERE id = $1", [res[i].id_business])).rows[0]

        favoriteBusinesses.push(business)
      }

      return favoriteBusinesses
    }
  })

  const favoriteBusinessesPostRouteSchema = {
    summary: 'Add a client favorite business',
    tags: ['clients'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    }
  }

  fastify.post("/favorite-businesses/:businessId", {
    schema: favoriteBusinessesPostRouteSchema,
    handler: async function (request, reply) {
      const clientId = request.params.clientId
      const businessId = request.params.businessId

      await pool.query("INSERT INTO favorite_businesses (id_client, id_business) VALUES ($1, $2)", [clientId, businessId])

      reply.code(204)
      return
    }
  })

  const favoriteBusinessesDeleteRouteSchema = {
    summary: 'Delete a client favorite business',
    tags: ['clients'],
    response: {
      204: {
        "$ref": 'generic204ResponseSchema'
      },
    }
  }

  fastify.delete("/favorite-businesses/:businessId", {
    schema: favoriteBusinessesDeleteRouteSchema,
    handler: async function (request, reply) {
      const clientId = request.params.clientId
      const businessId = request.params.businessId

      await pool.query("DELETE FROM favorite_businesses WHERE id_client = $1 AND id_business = $2", [clientId, businessId])

      reply.code(204)
      return
    }
  })
}