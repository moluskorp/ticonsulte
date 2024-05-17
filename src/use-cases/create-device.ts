import { DeviceRepository } from '@/repositories/device-repository'
import { Device } from '@prisma/client'

interface Request {
  legacy_id: number
  code: string
  branch_officeId: string
  entranceId: string
}

interface Response {
  device: Device
}

export class CreateDeviceUseCase {
  constructor(private deviceRepository: DeviceRepository) {}

  async execute({
    legacy_id,
    code,
    branch_officeId,
    entranceId,
  }: Request): Promise<Response> {
    const device = await this.deviceRepository.create({
      legacy_id,
      code,
      branch_officeId,
      entranceId,
    })

    return {
      device,
    }
  }
}
