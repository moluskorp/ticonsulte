import { Prisma } from '@prisma/client'
import { CompanyRepository } from '../company-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCompanyRepository implements CompanyRepository {
  async create(data: Prisma.CompanyCreateInput) {
    const company = await prisma.company.create({
      data,
    })

    return company
  }
}
