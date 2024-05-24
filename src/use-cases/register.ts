import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface Request {
  username: string
  email: string
  password: string
  branch_officeId: string
}

interface Response {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
    username,
    branch_officeId,
  }: Request): Promise<Response> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      username,
      password: password_hash,
      email,
      is_active: true,
      branch_officeId,
    })

    return {
      user,
    }
  }
}
