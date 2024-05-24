import { makeGetDailyVisitorUseCase } from '@/use-cases/factories/make-get-daily-visitor-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getDaily(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    year: z.string(),
    month: z.string(),
    day: z.string(),
  })

  const branch_officeId = request.user.sign.office

  const { year, month, day } = schema.parse(request.query)

  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

  const getDailyVisitorUseCase = makeGetDailyVisitorUseCase()

  const results = await getDailyVisitorUseCase.execute({
    date,
    branch_officeId,
  })

  return reply.status(201).send(results)
}
