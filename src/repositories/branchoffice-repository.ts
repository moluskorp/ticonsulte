import { Branch_office, Prisma } from '@prisma/client'

export interface BranchOfficeRepository {
  create(data: Prisma.Branch_officeUncheckedCreateInput): Promise<Branch_office>
}
