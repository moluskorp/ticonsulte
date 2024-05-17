import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { BranchOfficeRepository } from '../branchoffice-repository'

export class PrismaBranchOfficeRepository implements BranchOfficeRepository {
  async create(data: Prisma.Branch_officeUncheckedCreateInput) {
    const branchOffice = await prisma.branch_office.create({
      data,
    })

    return branchOffice
  }
}
