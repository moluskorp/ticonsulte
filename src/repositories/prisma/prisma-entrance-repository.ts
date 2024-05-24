import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { EntranceRepository } from '../entrance-repository'

export class PrismaEntranceRepository implements EntranceRepository {
  async create(data: Prisma.EntranceUncheckedCreateInput) {
    const entrance = await prisma.entrance.create({
      data,
    })

    return entrance
  }

  async findByName(name: string) {
    const entrance = await prisma.entrance.findFirst({
      where: {
        name,
      },
    })

    return entrance
  }
}
