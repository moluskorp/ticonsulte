import { Company, Prisma } from '@prisma/client'

export interface CompanyRepository {
  create(data: Prisma.CompanyCreateInput): Promise<Company>
  findByName(name: string): Promise<Company | null>
}
