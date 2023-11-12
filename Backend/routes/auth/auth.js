export default async function (fastify, opts) {
  fastify.get("/user", {
    schema: {
      summary: "Get user data",
      tags: ["auth"],
      response: {
        200: { description: "Login OK.", $ref: "userResponseSchema" },
      },
    },
    onRequest: [fastify.authenticate],
    handler: (request, reply) => {
      return reply.send(request.user)
    },
  })
}
