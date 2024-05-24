import { PrismaDeviceRepository } from '@/repositories/prisma/prisma-device-repository'
import { PrismaEntranceRepository } from '@/repositories/prisma/prisma-entrance-repository'
import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { PrismaBranchOfficeRepository } from '@/repositories/prisma/prisma-branchoffice-repository'
import { ImportDeviceUseCase } from '../import-device'

export function makeImportDeviceUseCase() {
  const deviceRepository = new PrismaDeviceRepository()
  const entranceRepository = new PrismaEntranceRepository()
  const companyRepository = new PrismaCompanyRepository()
  const branchOfficeRepository = new PrismaBranchOfficeRepository()
  const useCase = new ImportDeviceUseCase(
    deviceRepository,
    entranceRepository,
    companyRepository,
    branchOfficeRepository,
  )

  return useCase
}
