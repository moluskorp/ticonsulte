import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should hash the password before saving the user', async () => {
    const password = '1234'

    const { user } = await sut.execute({
      username: 'johndoe',
      email: 'johndoe@email.com',
      password,
      branch_officeId: '123',
    })

    const isPasswordCorrectlyHashed = await compare(password, user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      username: 'johndoe',
      email,
      password: '1234',
      branch_officeId: '123',
    })

    await expect(() =>
      sut.execute({
        username: 'johndoe',
        email,
        password: '1234',
        branch_officeId: '123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const password = '1234'

    const { user } = await sut.execute({
      username: 'johndoe',
      email: 'johndoe@email.com',
      password,
      branch_officeId: '123',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
