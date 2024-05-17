import { describe, beforeEach, expect, it } from 'vitest'
import { InMemoryBranchOfficeRepository } from '@/repositories/in-memory/in-memory-branchoffice-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryEntranceRepository } from '@/repositories/in-memory/in-memory-entrance-repository'
import { InMemoryDeviceRepository } from '@/repositories/in-memory/in-memory-device-repository'
import { CreateDeviceUseCase } from './create-device'

let branchOfficeRepository: InMemoryBranchOfficeRepository
let entranceRepository: InMemoryEntranceRepository
let companyRepository: InMemoryCompanyRepository
let deviceRepository: InMemoryDeviceRepository
let sut: CreateDeviceUseCase

describe('Create Device Use Case', () => {
  beforeEach(() => {
    branchOfficeRepository = new InMemoryBranchOfficeRepository()
    entranceRepository = new InMemoryEntranceRepository()
    companyRepository = new InMemoryCompanyRepository()
    deviceRepository = new InMemoryDeviceRepository()
    sut = new CreateDeviceUseCase(deviceRepository)
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

    const entrance = await entranceRepository.create({
      legacy_id: 1,
      branch_officeId: branch_office.id,
      name: 'Zona 1',
    })

    const { device } = await sut.execute({
      legacy_id: 1,
      code: 'CAM 01',
      branch_officeId: branch_office.id,
      entranceId: entrance.id,
    })

    expect(device.id).toEqual(expect.any(String))
  })
})
