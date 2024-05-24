import { makeGetDailyVisitorUseCase } from '@/use-cases/factories/make-get-daily-visitor-use-case'
import { makeGetMonthVisitorUseCase } from '@/use-cases/factories/make-get-month-visitor-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getMonth(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    year: z.string(),
    month: z.string(),
  })

  const branch_officeId = request.user.sign.office

  const { year, month } = schema.parse(request.query)

  const date = new Date(parseInt(year), parseInt(month) - 1)

  const getMonthVisitorUseCase = makeGetMonthVisitorUseCase()

  const results = await getMonthVisitorUseCase.execute({
    date,
    branch_officeId,
  })

  return reply.status(201).send(results)
}
