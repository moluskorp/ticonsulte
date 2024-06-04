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

  async findByDeviceKey(deviceKey: string) {
    const device = await prisma.device.findFirst({
      where: {
        device_key: deviceKey,
      },
    })
    return device
  }

  async findByName(name: string) {
    const device = await prisma.device.findFirst({
      where: {
        code: name,
      },
    })

    return device
  }

  async findByTokenAndName(branch_officeId: string, name: string) {
    console.log('repositório')
    console.log({ branch_officeId, name })
    const device = await prisma.device.findFirst({
      where: {
        branch_officeId,
        code: name,
      },
    })

    return device
  }

  async findAll() {
    const devices = await prisma.device.findMany()
    return devices
  }
}
