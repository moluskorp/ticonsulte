import { Device, Prisma } from '@prisma/client'

export interface DeviceRepository {
  create(data: Prisma.DeviceUncheckedCreateInput): Promise<Device>
}
