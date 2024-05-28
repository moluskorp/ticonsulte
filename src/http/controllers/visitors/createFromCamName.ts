import { makeCreateVisitorFromCamUseCase } from '@/use-cases/factories/make-create-visitor-from-cam-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createFromCam(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createSchema = z.object({
    camera: z.string(),
    rule_name: z.string(),
    token: z.string(),
  })

  const { camera, rule_name, token } = createSchema.parse(request.body)

  const createVisitorUseCase = makeCreateVisitorFromCamUseCase()

  await createVisitorUseCase.execute({
    camera,
    rule_name,
    branch_officeId: token,
  })

  return reply.status(201).send()
}
