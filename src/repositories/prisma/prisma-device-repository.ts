import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { DeviceRepository } from '../device-repository'

export class PrismaDeviceRepository implements DeviceRepository {
  async create(data: Prisma.DeviceUncheckedCreateInput) {
    const device = await prisma.device.create({
      data,
    })

    return device
  }
}
