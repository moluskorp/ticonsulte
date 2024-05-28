import { makeCreateVisitorUseCase } from '@/use-cases/factories/make-create-visitor-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    token: z.string(),
    rule_name: z.string(),
    event_time: z.date(),
    channel_name: z.string(),
  })

  const { token, rule_name, event_time, channel_name } = createSchema.parse(
    request.body,
  )

  const createVisitorUseCase = makeCreateVisitorUseCase()

  await createVisitorUseCase.execute({
    token,
    rule_name,
    event_time,
    channel_name,
  })

  return reply.status(201).send()
}
