import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function branchOfficeRoutes(app: FastifyInstance) {
  app.post('/branch_office', create)
}
