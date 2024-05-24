import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { create } from './create'
import { prisma } from '@/lib/prisma'

export async function branchOfficeRoutes(app: FastifyInstance) {
  app.post('/branch_office', create)

  app.get(
    '/branch_office',
    async (req: FastifyRequest, reply: FastifyReply) => {
      const offices = await prisma.branch_office.findMany()

      reply.send({ offices })
    },
  )
}
