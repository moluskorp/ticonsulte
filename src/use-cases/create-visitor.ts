import { DeviceRepository } from '@/repositories/device-repository'
import { VisitorRepository } from '@/repositories/visitor-repository'
import { Visitor } from '@prisma/client'
import { randomUUID } from 'crypto'

interface Request {
  rule_id: string
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
    rule_id,
    rule_name,
    event_time,
  }: Request): Promise<Response> {
    const device = await this.deviceRepository.findByDeviceKey(rule_id)

    if (!device) {
      throw new Error('Device not found')
    }
    let oldVisitor = await this.visitorRepository.findByDeviceId(device.id)

    if (!oldVisitor) {
      oldVisitor = {
        people_in: 0,
        people_out: 0,
        branch_officeId: device.branch_officeId,
        created_at: new Date(),
        date: new Date(),
        deviceId: device.id,
        id: randomUUID(),
        legacy_id: 1234,
        summarized: true,
        updated_at: new Date(),
        entranceId: device.entranceId,
      }
    }

    const visitor = await this.visitorRepository.create({
      branch_officeId: device.branch_officeId,
      date: event_time,
      deviceId: device.id,
      people_in:
        rule_name === 'Exit'
          ? oldVisitor.people_out + 1
          : oldVisitor.people_out,
      people_out:
        rule_name === 'Exit' ? oldVisitor.people_in : oldVisitor.people_in + 1,
      summarized: true,
      entranceId: device.entranceId,
    })

    return {
      visitor,
    }
  }
}
