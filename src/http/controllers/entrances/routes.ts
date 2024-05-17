import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function entrancesRoutes(app: FastifyInstance) {
  app.post('/entrance', create)
}
