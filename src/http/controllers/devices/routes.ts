import { FastifyInstance } from 'fastify'
import { create } from './create'
import { createFromFile } from './import'
import { prisma } from '@/lib/prisma'

export async function devicesRoutes(app: FastifyInstance) {
  app.post('/device', create)
  app.post('/device/import', createFromFile)
  // app.get('/device', async (request, reply) => {
  //   const devices = await prisma.device.findMany()

  //   for (const device of devices) {
  //     const code = device.code.trim()
  //     await prisma.device.update({
  //       where: { id: device.id },
  //       data: { code },
  //     })
  //   }

  //   reply.send()
  // })

  // app.get('/devices', async (request, reply) => {
  //   const devices = await prisma.device.findMany()
  //   reply.send(devices)
  // })
}
