import { BranchOfficeRepository } from '@/repositories/branchoffice-repository'
import { CompanyRepository } from '@/repositories/company-repository'
import { DeviceRepository } from '@/repositories/device-repository'
import { EntranceRepository } from '@/repositories/entrance-repository'
import { Device } from '@prisma/client'

interface Request {
  cnpj: string
  name: string
  matriz: boolean
  zona: string
  camera: string
}

interface Response {
  device: Device
}

export class ImportDeviceUseCase {
  constructor(
    private deviceRepository: DeviceRepository,
    private entranceRepository: EntranceRepository,
    private companyRepository: CompanyRepository,
    private branchOfficeRepository: BranchOfficeRepository,
  ) {}

  async execute({
    cnpj,
    name,
    matriz,
    zona,
    camera,
  }: Request): Promise<Response> {
    let company = await this.companyRepository.findByName(name)
    let branchOffice = await this.branchOfficeRepository.findByCnpj(cnpj)
    let entrance = await this.entranceRepository.findByName(zona)

    if (!company) {
      company = await this.companyRepository.create({
        legacy_id: 999,
        name,
      })
    }

    if (!branchOffice) {
      branchOffice = await this.branchOfficeRepository.create({
        cnpj,
        companyId: company.id,
        legacy_id: 999,
        main: matriz,
        name: matriz ? `${name} - MATRIZ` : name,
      })
    }

    if (!entrance) {
      entrance = await this.entranceRepository.create({
        branch_officeId: branchOffice.id,
        legacy_id: 999,
        name: zona,
      })
    }

    const device = await this.deviceRepository.create({
      legacy_id: Math.floor(Math.random() * (100 - 1 + 1) + 1),
      code: camera,
      branch_officeId: branchOffice.id,
      entranceId: entrance.id,
    })

    return {
      device,
    }
  }
}
