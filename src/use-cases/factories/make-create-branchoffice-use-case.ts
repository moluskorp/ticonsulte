import { CreateBranchOfficeUseCase } from '../create-branchoffice'
import { PrismaBranchOfficeRepository } from '@/repositories/prisma/prisma-branchoffice-repository'

export function makeCreateBranchOfficeUseCase() {
  const branchOfficeRepository = new PrismaBranchOfficeRepository()
  const useCase = new CreateBranchOfficeUseCase(branchOfficeRepository)

  return useCase
}
