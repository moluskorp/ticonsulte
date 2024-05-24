import { PrismaVisitorRepository } from '@/repositories/prisma/prisma-visitor-repository'
import { CreateVisitorUseCase } from '../create-visitor'
import { PrismaDeviceRepository } from '@/repositories/prisma/prisma-device-repository'

export function makeCreateVisitorUseCase() {
  const visitorRepository = new PrismaVisitorRepository()
  const deviceRepository = new PrismaDeviceRepository()
  const useCase = new CreateVisitorUseCase(visitorRepository, deviceRepository)

  return useCase
}
