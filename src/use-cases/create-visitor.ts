import { DeviceRepository } from '@/repositories/device-repository'
import { VisitorRepository } from '@/repositories/visitor-repository'
import { Visitor } from '@prisma/client'

interface Request {
  token: string
  channel_name: string
  rule_name: string
  event_time: Date
}

interface Response {
  visitor: Visitor
}

export class CreateVisitorUseCase {
  constructor(
    private visitorRepository: VisitorRepository,
    private deviceRepository: DeviceRepository,
  ) {}

  async execute({
    token,
    channel_name,
    rule_name,
    event_time,
  }: Request): Promise<Response> {
    const device = await this.deviceRepository.findByTokenAndName(
      token,
      channel_name,
    )

    const devices = await this.deviceRepository.findAll()

    console.log({ devices })

    if (!device) {
      throw new Error('Device not found')
    }

    const visitor = await this.visitorRepository.create({
      branch_officeId: token,
      date: event_time,
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
