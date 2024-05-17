import { PrismaVisitorRepository } from '@/repositories/prisma/prisma-visitor-repository'
import { CreateVisitorUseCase } from '../create-visitor'

export function makeCreateVisitorUseCase() {
  const visitorRepository = new PrismaVisitorRepository()
  const useCase = new CreateVisitorUseCase(visitorRepository)

  return useCase
}
