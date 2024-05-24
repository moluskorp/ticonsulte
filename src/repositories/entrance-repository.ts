import { Entrance, Prisma } from '@prisma/client'

export interface EntranceRepository {
  create(data: Prisma.EntranceUncheckedCreateInput): Promise<Entrance>
  findByName(name: string): Promise<Entrance | null>
}
