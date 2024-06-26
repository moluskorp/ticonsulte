import { Device, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { DeviceRepository } from '../device-repository'

export class PrismaDeviceRepository implements DeviceRepository {
  async create(data: Prisma.DeviceUncheckedCreateInput) {
    const device = await prisma.device.create({
      data: {
        ...data,
        code: data.code.toUpperCase(),
      },
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
    const [device] = await prisma.$queryRaw<Device[]>`
      SELECT * FROM "Device" WHERE "branch_officeId" = ${branch_officeId} 
      AND UPPER("code") = ${name.toUpperCase()}
      LIMIT 1;
    `
    console.log('findBY token')
    console.log({ branch_officeId, name })
    console.log({ device })
    // const device = await prisma.device.findFirst({
    //   where: {
    //     branch_officeId,
    //     code: name.toUpperCase(),
    //   },
    // })

    console.log('repositório')
    console.log({ device })

    return device
  }

  async findAll() {
    const devices = await prisma.device.findMany()
    return devices
  }
}
