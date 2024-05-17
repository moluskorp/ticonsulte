import { Company, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { EntranceRepository } from '../entrance-repository'

export class InMemoryEntranceRepository implements EntranceRepository {
  public items: Company[] = []
  async create(data: Prisma.EntranceUncheckedCreateInput) {
    const branch_office = {
      id: data.id ?? randomUUID(),
      legacy_id: data.legacy_id,
      name: data.name,
      branch_officeId: data.branch_officeId,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(branch_office)

    return branch_office
  }
}
