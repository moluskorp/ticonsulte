import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { GetDailyResponse, VisitorRepository } from '../visitor-repository'

type DailyResult = {
  hora: string
  people_in: number
  people_out: number
}

export class PrismaVisitorRepository implements VisitorRepository {
  async create(data: Prisma.VisitorUncheckedCreateInput) {
    const date = new Date(data.date)
    date.setHours(date.getHours() - 3)
    console.log(date)
    const visitor = await prisma.visitor.create({
      data: {
        ...data,
        date,
      },
    })

    return visitor
  }

  async findByDeviceId(deviceId: string) {
    const visitor = await prisma.visitor.findFirst({
      where: {
        deviceId,
      },
      take: 1,
      orderBy: {
        created_at: 'desc',
      },
    })

    return visitor
  }

  async getDay(date: Date, branchOfficeId: string) {
    const startDate = new Date(date)
    const finalDate = new Date(date)
    finalDate.setHours(23, 59, 59, 999)

    const groupedVisitors = await prisma.visitor.groupBy({
      by: ['entranceId'],
      where: {
        date: {
          gte: startDate,
          lte: finalDate,
        },
        branch_officeId: branchOfficeId,
      },
      _sum: {
        people_in: true,
        people_out: true,
      },
    })

    const entranceIds = groupedVisitors.map((visitor) => visitor.entranceId)

    const entrances = await prisma.entrance.findMany({
      where: {
        id: { in: entranceIds },
      },
      select: {
        id: true,
        name: true,
      },
    })

    const entranceMap = entrances.reduce((acc, entrance) => {
      acc[entrance.id] = entrance.name
      return acc
    }, {} as any)

    const results = groupedVisitors.map((visitor) => ({
      name: (entranceMap[visitor.entranceId] as string) || 'Unknown',
      people_in: visitor._sum.people_in || 0,
      people_out: visitor._sum.people_out || 0,
    }))

    return results
  }

  async getDaily(date: Date, branchOfficeId: string) {
    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)
    const finalDate = new Date(date)
    finalDate.setHours(23, 59, 59, 999)

    const results = (await prisma.$queryRaw`
      SELECT 
        TO_CHAR(date, 'HH24:00') as hora,
        SUM("people_in") as people_in,
        SUM("people_out") as people_out
      FROM "Visitor"
      WHERE "date" BETWEEN ${startDate} AND ${finalDate}
        AND "branch_officeId" = ${branchOfficeId}
      GROUP BY TO_CHAR(date, 'HH24:00')
      ORDER BY hora
    `) as DailyResult[]

    const formattedResults = results.map((row) => ({
      hora: row.hora,
      people_in: Number(row.people_in),
      people_out: Number(row.people_out),
    }))

    const hourlyData = {} as any

    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, '0') + ':00'
      hourlyData[hour] = { hora: hour, people_in: 0, people_out: 0 }
    }

    formattedResults.forEach((result) => {
      hourlyData[result.hora] = result
    })

    const finalResults = Object.values(hourlyData) as GetDailyResponse[]

    return finalResults
  }

  async getMonth(date: Date, branchOfficeId: string) {
    const startDate = new Date(date.getFullYear(), date.getMonth(), 1)
    startDate.setHours(0, 0, 0, 0)
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    endDate.setHours(23, 59, 59, 999)

    const results = (await prisma.$queryRaw`
      SELECT
        TO_CHAR(date, 'YYYY-MM-DD') as day,
        SUM(people_in) as people_in,
        SUM(people_out) as people_out
      FROM "Visitor"
      WHERE date BETWEEN ${startDate} AND ${endDate}
        AND "branch_officeId" = ${branchOfficeId}
      GROUP BY TO_CHAR(date, 'YYYY-MM-DD')
      ORDER BY day
    `) as any

    const formattedResults = results.map((row: any) => ({
      date: row.day,
      people_in: Number(row.people_in),
      people_out: Number(row.people_out),
    })) as {
      date: string
      people_in: number
      people_out: number
    }[]

    return formattedResults
  }
}
