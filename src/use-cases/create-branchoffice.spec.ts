import { describe, beforeEach, expect, it } from 'vitest'
import { InMemoryBranchOfficeRepository } from '@/repositories/in-memory/in-memory-branchoffice-repository'
import { CreateBranchOfficeUseCase } from './create-branchoffice'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'

let branchOfficeRepository: InMemoryBranchOfficeRepository
let companyRepository: InMemoryCompanyRepository
let sut: CreateBranchOfficeUseCase

describe('Create Company Use Case', () => {
  beforeEach(() => {
    branchOfficeRepository = new InMemoryBranchOfficeRepository()
    companyRepository = new InMemoryCompanyRepository()
    sut = new CreateBranchOfficeUseCase(branchOfficeRepository)
  })

  it('should be able to create a company', async () => {
    const company = await companyRepository.create({
      legacy_id: 1,
      name: 'Compania',
    })

    const { branchOffice } = await sut.execute({
      legacy_id: 1,
      name: 'office 1',
      cnpj: '12345678',
      companyId: company.id,
      main: true,
    })

    expect(branchOffice.id).toEqual(expect.any(String))
  })
})
