import { FastifyInstance } from 'fastify'
import { create } from './create'
import { createFromFile } from './import'

export async function devicesRoutes(app: FastifyInstance) {
  app.post('/device', create)
  app.post('/device/import', createFromFile)
}
