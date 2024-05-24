import { Entrance, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { EntranceRepository } from '../entrance-repository'

export class InMemoryEntranceRepository implements EntranceRepository {
  public items: Entrance[] = []
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

  async findByName(name: string) {
    const entrance = this.items.find((item) => item.name === name)

    if (entrance) {
      return entrance
    }
    return null
  }
}
