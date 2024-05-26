import { Prisma, Visitor } from '@prisma/client'

export type GetDayResponse = {
  name: string
  people_in: number
  people_out: number
}

export type GetDailyResponse = {
  people_in: number
  people_out: number
  hora: string
}

export type GetMonthResponse = {
  people_in: number
  people_out: number
  date: string
}

export interface VisitorRepository {
  create(data: Prisma.VisitorUncheckedCreateInput): Promise<Visitor>
  findByDeviceId(deviceId: string): Promise<Visitor | null>
  getDay(date: Date, branchOfficeId: string): Promise<GetDayResponse[]>
  getDaily(date: Date, branchOfficeId: string): Promise<GetDailyResponse[]>
  getMonth(date: Date, branchOfficeId: string): Promise<GetMonthResponse[]>
}
