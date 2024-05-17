import { makeCreateDeviceUseCase } from '@/use-cases/factories/make-create-device-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    legacy_id: z.number(),
    code: z.string(),
    branch_officeId: z.string(),
    entranceId: z.string(),
  })

  const { legacy_id, code, branch_officeId, entranceId } = createSchema.parse(
    request.body,
  )

  const createDeviceUseCase = makeCreateDeviceUseCase()

  await createDeviceUseCase.execute({
    legacy_id,
    code,
    branch_officeId,
    entranceId,
  })

  return reply.status(201).send()
}
