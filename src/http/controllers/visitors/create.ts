import { makeCreateVisitorUseCase } from '@/use-cases/factories/make-create-visitor-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    token: z.string(),
    rule_name: z.string(),
    event_time: z.string(),
    channel_name: z.string(),
  })

  const { token, rule_name, event_time, channel_name } = createSchema.parse(
    request.body,
  )

  const date = new Date(event_time)
  console.log(date)

  const createVisitorUseCase = makeCreateVisitorUseCase()

  await createVisitorUseCase.execute({
    token,
    rule_name,
    event_time: date,
    channel_name: channel_name.trim(),
  })

  return reply.status(201).send()
}
