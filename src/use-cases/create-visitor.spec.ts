import { describe, beforeEach, expect, it } from 'vitest'
import { InMemoryBranchOfficeRepository } from '@/repositories/in-memory/in-memory-branchoffice-repository'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { InMemoryEntranceRepository } from '@/repositories/in-memory/in-memory-entrance-repository'
import { InMemoryDeviceRepository } from '@/repositories/in-memory/in-memory-device-repository'
import { InMemoryVisitorRepository } from '@/repositories/in-memory/in-memory-visitor-repository'
import { CreateVisitorUseCase } from './create-visitor'

let branchOfficeRepository: InMemoryBranchOfficeRepository
let entranceRepository: InMemoryEntranceRepository
let companyRepository: InMemoryCompanyRepository
let deviceRepository: InMemoryDeviceRepository
let visitorRepository: InMemoryVisitorRepository
let sut: CreateVisitorUseCase

describe('Create Visitor Use Case', () => {
  beforeEach(() => {
    branchOfficeRepository = new InMemoryBranchOfficeRepository()
    entranceRepository = new InMemoryEntranceRepository()
    companyRepository = new InMemoryCompanyRepository()
    deviceRepository = new InMemoryDeviceRepository()
    visitorRepository = new InMemoryVisitorRepository()
    sut = new CreateVisitorUseCase(visitorRepository, deviceRepository)
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

    const device = await deviceRepository.create({
      legacy_id: 1,
      code: 'CAM 01',
      branch_officeId: branch_office.id,
      entranceId: entrance.id,
    })

    const { visitor } = await sut.execute({
      channel_name: device.code,
      event_time: new Date(),
      token: branch_office.id,
      rule_name: 'Exit',
    })

    expect(visitor.id).toEqual(expect.any(String))
  })
})
