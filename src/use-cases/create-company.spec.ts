import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { describe, beforeEach, expect, it } from 'vitest'
import { CreateCompanyUseCase } from './create-company'

let companyRepository: InMemoryCompanyRepository
let sut: CreateCompanyUseCase

describe('Create Company Use Case', () => {
  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository()
    sut = new CreateCompanyUseCase(companyRepository)
  })

  it('should be able to create a company', async () => {
    const { company } = await sut.execute({
      legacy_id: 1,
      name: 'Compania',
    })

    expect(company.id).toEqual(expect.any(String))
  })
})
