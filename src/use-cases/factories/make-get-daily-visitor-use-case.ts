import { PrismaVisitorRepository } from '@/repositories/prisma/prisma-visitor-repository'
import { GetDailyVisitorUseCase } from '../get-daily-visitor'

export function makeGetDailyVisitorUseCase() {
  const visitorRepository = new PrismaVisitorRepository()
  const useCase = new GetDailyVisitorUseCase(visitorRepository)

  return useCase
}
