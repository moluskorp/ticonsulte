import { Prisma, Visitor } from '@prisma/client'
import { randomUUID } from 'crypto'
import { VisitorRepository } from '../visitor-repository'

export class InMemoryVisitorRepository implements VisitorRepository {
  public items: Visitor[] = []
  async create(data: Prisma.VisitorUncheckedCreateInput) {
    const visitor = {
      id: data.id ?? randomUUID(),
      legacy_id: data.legacy_id || 1,
      date: new Date(data.date),
      people_in: data.people_in,
      people_out: data.people_out,
      summarized: data.summarized,
      branch_officeId: data.branch_officeId,
      entranceId: data.entranceId,
      deviceId: data.deviceId,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(visitor)

    return visitor
  }

  async findByDeviceId(deviceId: string) {
    const visitor = this.items.find((item) => item.deviceId === deviceId)

    if (visitor) {
      return visitor
    }
    return null
  }
}
