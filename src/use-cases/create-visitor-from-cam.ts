import { DeviceRepository } from '@/repositories/device-repository'
import { VisitorRepository } from '@/repositories/visitor-repository'
import { Visitor } from '@prisma/client'

interface Request {
  camera: string
  rule_name: string
}

interface Response {
  visitor: Visitor
}

export class CreateVisitorFromCamUseCase {
  constructor(
    private visitorRepository: VisitorRepository,
    private deviceRepository: DeviceRepository,
  ) {}

  async execute({ camera, rule_name }: Request): Promise<Response> {
    const device = await this.deviceRepository.findByName(camera)

    if (!device) {
      throw new Error('Device not found')
    }

    const visitor = await this.visitorRepository.create({
      branch_officeId: device.branch_officeId,
      date: new Date(),
      deviceId: device.id,
      people_in: rule_name === 'Exit' ? 0 : 1,
      people_out: rule_name === 'Exit' ? 1 : 0,
      summarized: true,
      entranceId: device.entranceId,
    })

    return {
      visitor,
    }
  }
}
