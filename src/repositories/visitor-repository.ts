import { Prisma, Visitor } from '@prisma/client'

export interface VisitorRepository {
  create(data: Prisma.VisitorUncheckedCreateInput): Promise<Visitor>
}
