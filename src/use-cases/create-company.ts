import { CompanyRepository } from '@/repositories/company-repository'
import { Company } from '@prisma/client'

interface CreateCompanyUseCaseRequest {
  legacy_id: number
  name: string
}

interface Response {
  company: Company
}

export class CreateCompanyUseCase {
  constructor(private companyRepository: CompanyRepository) {}

  async execute({
    legacy_id,
    name,
  }: CreateCompanyUseCaseRequest): Promise<Response> {
    const company = await this.companyRepository.create({
      legacy_id,
      name,
    })

    return {
      company,
    }
  }
}
