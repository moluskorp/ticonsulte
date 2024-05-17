import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function visitorsRoutes(app: FastifyInstance) {
  app.post('/visitor', create)
}
