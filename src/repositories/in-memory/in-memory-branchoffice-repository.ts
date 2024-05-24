import { Branch_office, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { BranchOfficeRepository } from '../branchoffice-repository'

export class InMemoryBranchOfficeRepository implements BranchOfficeRepository {
  public items: Branch_office[] = []
  async create(data: Prisma.Branch_officeUncheckedCreateInput) {
    const branch_office = {
      id: data.id ?? randomUUID(),
      legacy_id: data.legacy_id,
      name: data.name,
      main: data.main,
      cnpj: data.cnpj,
      companyId: data.companyId,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(branch_office)

    return branch_office
  }

  async findByCnpj(cnpj: string) {
    const branchOffice = this.items.find((item) => item.cnpj === cnpj)
    if (branchOffice) {
      return branchOffice
    }
    return null
  }
}
