import { makeCreateBranchOfficeUseCase } from '@/use-cases/factories/make-create-branchoffice-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    legacy_id: z.number(),
    name: z.string(),
    main: z.boolean(),
    companyId: z.string(),
    cnpj: z.string(),
  })

  const { legacy_id, name, main, companyId, cnpj } = createSchema.parse(
    request.body,
  )

  const createBranchOfficeUseCase = makeCreateBranchOfficeUseCase()

  await createBranchOfficeUseCase.execute({
    legacy_id,
    name,
    main,
    companyId,
    cnpj,
  })

  return reply.status(201).send()
}
