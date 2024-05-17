import { describe, beforeEach, expect, it } from 'vitest'
import { InMemoryBranchOfficeRepository } from '@/repositories/in-memory/in-memory-branchoffice-repository'
import { CreateBranchOfficeUseCase } from './create-branchoffice'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryEntranceRepository } from '@/repositories/in-memory/in-memory-entrance-repository'
import { CreateEntranceUseCase } from './create-entrance'

let branchOfficeRepository: InMemoryBranchOfficeRepository
let companyRepository: InMemoryCompanyRepository
let entranceRepository: InMemoryEntranceRepository
let sut: CreateEntranceUseCase

describe('Create Company Use Case', () => {
  beforeEach(() => {
    branchOfficeRepository = new InMemoryBranchOfficeRepository()
    entranceRepository = new InMemoryEntranceRepository()
    companyRepository = new InMemoryCompanyRepository()
    sut = new CreateEntranceUseCase(entranceRepository)
  })

  it('should be able to create a company', async () => {
    const company = await companyRepository.create({
      legacy_id: 1,
      name: 'Compania',
    })

    const branch_office = await branchOfficeRepository.create({
      legacy_id: 1,
      name: 'Compania',
      companyId: company.id,
      cnpj: '12345678',
      main: true,
    })

    const { entrance } = await sut.execute({
      legacy_id: 1,
      name: 'office 1',
      branch_officeId: branch_office.id,
    })

    expect(entrance.id).toEqual(expect.any(String))
  })
})
