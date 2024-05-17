import { Company, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { BranchOfficeRepository } from '../branchoffice-repository'

export class InMemoryBranchOfficeRepository implements BranchOfficeRepository {
  public items: Company[] = []
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
}
