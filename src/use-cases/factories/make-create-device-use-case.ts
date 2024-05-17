import { PrismaDeviceRepository } from '@/repositories/prisma/prisma-device-repository'
import { CreateDeviceUseCase } from '../create-device'

export function makeCreateDeviceUseCase() {
  const deviceRepository = new PrismaDeviceRepository()
  const useCase = new CreateDeviceUseCase(deviceRepository)

  return useCase
}
