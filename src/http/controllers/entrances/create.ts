import { makeCreateEntraceUseCase } from '@/use-cases/factories/make-create-entrance-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    legacy_id: z.number(),
    name: z.string(),
    branch_officeId: z.string(),
  })

  const { legacy_id, name, branch_officeId } = createSchema.parse(request.body)

  const createEntranceUseCase = makeCreateEntraceUseCase()

  await createEntranceUseCase.execute({
    legacy_id,
    name,
    branch_officeId,
  })

  return reply.status(201).send()
}
