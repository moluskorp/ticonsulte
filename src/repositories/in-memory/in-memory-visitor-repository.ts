import { Prisma, Visitor } from '@prisma/client'
import { randomUUID } from 'crypto'
import { VisitorRepository } from '../visitor-repository'

export class InMemoryVisitorRepository implements VisitorRepository {
  public items: Visitor[] = []
  async create(data: Prisma.VisitorUncheckedCreateInput) {
    const visitor = {
      id: data.id ?? randomUUID(),
      legacy_id: data.legacy_id,
      date: new Date(data.date),
      people_in: data.people_in,
      people_out: data.people_out,
      summarized: data.summarized,
      branch_officeId: data.branch_officeId,
      deviceId: data.deviceId,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(visitor)

    return visitor
  }
}
