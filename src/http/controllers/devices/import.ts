import { makeImportDeviceUseCase } from '@/use-cases/factories/make-import-device-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createFromFile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createSchema = z.object({
    cnpj: z.number(),
    name: z.string(),
    matriz: z.boolean(),
    zona: z.string(),
    camera: z.string(),
  })

  const { cnpj, name, matriz, zona, camera } = createSchema.parse(request.body)

  const importDeviceUseCase = makeImportDeviceUseCase()

  await importDeviceUseCase.execute({
    cnpj: String(cnpj),
    name,
    matriz: Boolean(matriz),
    zona,
    camera,
  })

  return reply.status(201).send()
}
