import { FastifyInstance } from 'fastify'
import { create } from './create'
import { createFromCam } from './createFromCamName'
import { getDay } from './getDay'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getDaily } from './getDaily'
import { getMonth } from './getMonth'

export async function visitorsRoutes(app: FastifyInstance) {
  app.post('/visitor', create)
  app.post('/visitor/cam', createFromCam)

  app.get('/visitor/day', { onRequest: [verifyJWT] }, getDay)
  app.get('/visitor/daily', { onRequest: [verifyJWT] }, getDaily)
  app.get('/visitor/month', { onRequest: [verifyJWT] }, getMonth)
}
