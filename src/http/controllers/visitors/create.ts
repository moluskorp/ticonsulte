import { makeCreateVisitorUseCase } from '@/use-cases/factories/make-create-visitor-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    legacy_id: z.number(),
    date: z.date(),
    people_in: z.number(),
    people_out: z.number(),
    summarized: z.boolean(),
    branch_officeId: z.string(),
    deviceId: z.string(),
  })

  const {
    legacy_id,
    branch_officeId,
    deviceId,
    date,
    people_in,
    people_out,
    summarized,
  } = createSchema.parse(request.body)

  const createVisitorUseCase = makeCreateVisitorUseCase()

  await createVisitorUseCase.execute({
    legacy_id,
    branch_officeId,
    deviceId,
    date,
    people_in,
    people_out,
    summarized,
  })

  return reply.status(201).send()
}
