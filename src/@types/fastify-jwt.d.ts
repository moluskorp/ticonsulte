import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sign: {
        sub: string
        office: string
      }
      role: 'ADMIN' | 'MEMBER'
    }
  }
}
