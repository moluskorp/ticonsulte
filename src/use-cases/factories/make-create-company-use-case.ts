import { PrismaCompanyRepository } from '@/repositories/prisma/prisma-company-repository'
import { CreateCompanyUseCase } from '../create-company'

export function makeCreateCompanyUseCase() {
  const companyRepository = new PrismaCompanyRepository()
  const useCase = new CreateCompanyUseCase(companyRepository)

  return useCase
}
