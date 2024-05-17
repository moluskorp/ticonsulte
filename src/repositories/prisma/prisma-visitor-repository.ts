import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { VisitorRepository } from '../visitor-repository'

export class PrismaVisitorRepository implements VisitorRepository {
  async create(data: Prisma.VisitorUncheckedCreateInput) {
    const visitor = await prisma.visitor.create({
      data,
    })

    return visitor
  }
}
