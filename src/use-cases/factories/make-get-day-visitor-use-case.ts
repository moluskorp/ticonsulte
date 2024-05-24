import { PrismaVisitorRepository } from '@/repositories/prisma/prisma-visitor-repository'
import { GetDayVisitorUseCase } from '../get-day-visitor'

export function makeGetDayVisitorUseCase() {
  const visitorRepository = new PrismaVisitorRepository()
  const useCase = new GetDayVisitorUseCase(visitorRepository)

  return useCase
}
