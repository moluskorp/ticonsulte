import { PrismaVisitorRepository } from '@/repositories/prisma/prisma-visitor-repository'
import { GetMonthVisitorUseCase } from '../get-month-visitor'

export function makeGetMonthVisitorUseCase() {
  const visitorRepository = new PrismaVisitorRepository()
  const useCase = new GetMonthVisitorUseCase(visitorRepository)

  return useCase
}
