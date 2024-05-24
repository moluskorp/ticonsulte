import { describe, expect, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { env } from '@/env'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('1234', 6),
      branch_officeId: '123',
      is_active: true,
    })

    const { user } = await sut.execute({
      username: 'John Doe',
      password: '1234',
    })

    console.log(env.NODE_ENV)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        username: 'johndoe@email.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      username: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('1234', 6),
      branch_officeId: '123',
      is_active: true,
    })

    await expect(() =>
      sut.execute({
        username: 'John Doe',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
