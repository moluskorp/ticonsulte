import { EntranceRepository } from '@/repositories/entrance-repository'
import { Entrance } from '@prisma/client'

interface Request {
  legacy_id: number
  name: string
  branch_officeId: string
}

interface Response {
  entrance: Entrance
}

export class CreateEntranceUseCase {
  constructor(private entranceRepository: EntranceRepository) {}

  async execute({
    legacy_id,
    name,
    branch_officeId,
  }: Request): Promise<Response> {
    const entrance = await this.entranceRepository.create({
      legacy_id,
      name,
      branch_officeId,
    })

    return {
      entrance,
    }
  }
}
