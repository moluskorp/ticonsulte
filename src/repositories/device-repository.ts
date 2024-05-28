import { Device, Prisma } from '@prisma/client'

export interface DeviceRepository {
  create(data: Prisma.DeviceUncheckedCreateInput): Promise<Device>
  findByDeviceKey(deviceKey: string): Promise<Device | null>
  findByName(name: string): Promise<Device | null>
  findByTokenAndName(
    branch_officeId: string,
    name: string,
  ): Promise<Device | null>
}
