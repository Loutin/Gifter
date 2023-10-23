/* c8 ignore start */
export default async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })
}
/* c8 ignore stop */