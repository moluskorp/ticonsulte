import { VisitorRepository } from '@/repositories/visitor-repository'
import { Visitor } from '@prisma/client'

interface Request {
  legacy_id: number
  date: Date
  people_in: number
  people_out: number
  summarized: boolean
  branch_officeId: string
  deviceId: string
}

interface Response {
  visitor: Visitor
}

export class CreateVisitorUseCase {
  constructor(private visitorRepository: VisitorRepository) {}

  async execute({
    legacy_id,
    date,
    branch_officeId,
    deviceId,
    people_in,
    people_out,
    summarized,
  }: Request): Promise<Response> {
    const visitor = await this.visitorRepository.create({
      legacy_id,
      date,
      branch_officeId,
      deviceId,
      people_in,
      people_out,
      summarized,
    })

    return {
      visitor,
    }
  }
}
