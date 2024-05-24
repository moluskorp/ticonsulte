import {
  GetMonthResponse,
  VisitorRepository,
} from '@/repositories/visitor-repository'

interface Request {
  date: Date
  branch_officeId: string
}

export class GetMonthVisitorUseCase {
  constructor(private visitorRepository: VisitorRepository) {}

  async execute({
    date,
    branch_officeId,
  }: Request): Promise<GetMonthResponse[]> {
    const results = await this.visitorRepository.getMonth(date, branch_officeId)

    return results
  }
}
