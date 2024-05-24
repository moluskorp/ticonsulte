import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      branch_officeId: data.branch_officeId,
      email: data.email,
      id: randomUUID(),
      is_active: data.is_active,
      password: data.password,
      username: data.username,
    } as User

    this.items.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (user) {
      return user
    }

    return null
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (user) {
      return user
    }

    return null
  }

  async findByUsername(username: string) {
    const user = this.items.find((item) => item.username === username)

    if (user) {
      return user
    }

    return null
  }
}
