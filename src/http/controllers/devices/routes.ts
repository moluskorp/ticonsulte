import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function devicesRoutes(app: FastifyInstance) {
  app.post('/device', create)
}
