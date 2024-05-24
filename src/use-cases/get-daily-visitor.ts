import {
  GetDailyResponse,
  VisitorRepository,
} from '@/repositories/visitor-repository'

interface Request {
  date: Date
  branch_officeId: string
}

export class GetDailyVisitorUseCase {
  constructor(private visitorRepository: VisitorRepository) {}

  async execute({
    date,
    branch_officeId,
  }: Request): Promise<GetDailyResponse[]> {
    const results = await this.visitorRepository.getDaily(date, branch_officeId)

    return results
  }
}
