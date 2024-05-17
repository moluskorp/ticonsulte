import { Company, Prisma } from '@prisma/client'
import { CompanyRepository } from '../company-repository'
import { randomUUID } from 'crypto'

export class InMemoryCompanyRepository implements CompanyRepository {
  public items: Company[] = []
  async create(data: Prisma.CompanyCreateInput) {
    const company = {
      id: data.id ?? randomUUID(),
      legacy_id: data.legacy_id,
      name: data.name,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(company)

    return company
  }
}
