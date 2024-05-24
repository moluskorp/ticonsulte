import { makeCreateVisitorUseCase } from '@/use-cases/factories/make-create-visitor-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    rule_id: z.string(),
    rule_name: z.string(),
    event_time: z.date(),
  })

  const { rule_id, rule_name, event_time } = createSchema.parse(request.body)

  const createVisitorUseCase = makeCreateVisitorUseCase()

  await createVisitorUseCase.execute({
    rule_id,
    rule_name,
    event_time,
  })

  return reply.status(201).send()
}
