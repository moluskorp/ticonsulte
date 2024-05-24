import { makeCreateVisitorUseCase } from '@/use-cases/factories/make-create-visitor-use-case'
import { makeGetDayVisitorUseCase } from '@/use-cases/factories/make-get-day-visitor-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getDay(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    year: z.string(),
    month: z.string(),
    day: z.string(),
  })

  const branch_officeId = request.user.sign.office

  const { year, month, day } = schema.parse(request.query)

  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

  const getDayVisitorUseCase = makeGetDayVisitorUseCase()

  const results = await getDayVisitorUseCase.execute({
    date,
    branch_officeId,
  })

  return reply.status(201).send(results)
}
