import { PrismaEntranceRepository } from '@/repositories/prisma/prisma-entrance-repository'
import { CreateEntranceUseCase } from '../create-entrance'

export function makeCreateEntraceUseCase() {
  const entranceRepository = new PrismaEntranceRepository()
  const useCase = new CreateEntranceUseCase(entranceRepository)

  return useCase
}
