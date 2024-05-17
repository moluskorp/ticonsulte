import { Device, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { DeviceRepository } from '../device-repository'

export class InMemoryDeviceRepository implements DeviceRepository {
  public items: Device[] = []
  async create(data: Prisma.DeviceUncheckedCreateInput) {
    const device = {
      id: data.id ?? randomUUID(),
      legacy_id: data.legacy_id,
      code: data.code,
      branch_officeId: data.branch_officeId,
      entranceId: data.entranceId,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(device)

    return device
  }
}
