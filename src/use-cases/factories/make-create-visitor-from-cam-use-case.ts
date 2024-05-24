import { PrismaVisitorRepository } from '@/repositories/prisma/prisma-visitor-repository'
import { PrismaDeviceRepository } from '@/repositories/prisma/prisma-device-repository'
import { CreateVisitorFromCamUseCase } from '../create-visitor-from-cam'

export function makeCreateVisitorFromCamUseCase() {
  const visitorRepository = new PrismaVisitorRepository()
  const deviceRepository = new PrismaDeviceRepository()
  const useCase = new CreateVisitorFromCamUseCase(
    visitorRepository,
    deviceRepository,
  )

  return useCase
}
