import { BranchOfficeRepository } from '@/repositories/branchoffice-repository'
import { Branch_office } from '@prisma/client'

interface Request {
  legacy_id: number
  name: string
  main: boolean
  cnpj: string
  companyId: string
}

interface Response {
  branchOffice: Branch_office
}

export class CreateBranchOfficeUseCase {
  constructor(private branchofficeRepository: BranchOfficeRepository) {}

  async execute({
    cnpj,
    companyId,
    legacy_id,
    main,
    name,
  }: Request): Promise<Response> {
    const branchOffice = await this.branchofficeRepository.create({
      cnpj,
      companyId,
      legacy_id,
      main,
      name,
    })

    return {
      branchOffice,
    }
  }
}
