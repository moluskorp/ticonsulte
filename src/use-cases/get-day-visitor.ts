import {
  GetDayResponse,
  VisitorRepository,
} from '@/repositories/visitor-repository'

interface Request {
  date: Date
  branch_officeId: string
}

export class GetDayVisitorUseCase {
  constructor(private visitorRepository: VisitorRepository) {}

  async execute({ date, branch_officeId }: Request): Promise<GetDayResponse[]> {
    const results = await this.visitorRepository.getDay(date, branch_officeId)
    return results
  }
}
