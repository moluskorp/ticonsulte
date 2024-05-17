import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function companiesRoutes(app: FastifyInstance) {
  app.post('/company', create)
}
