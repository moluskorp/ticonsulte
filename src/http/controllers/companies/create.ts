import { makeCreateCompanyUseCase } from '@/use-cases/factories/make-create-company-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    legacy_id: z.number(),
    name: z.string(),
  })

  const { legacy_id, name } = createSchema.parse(request.body)

  const createCompanyUseCase = makeCreateCompanyUseCase()

  await createCompanyUseCase.execute({
    legacy_id,
    name,
  })

  return reply.status(201).send()
}
