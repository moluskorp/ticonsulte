import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = bodySchema.parse(request.body)

  const token = await reply.jwtSign(
    { role: 'user.role' },
    { sign: { sub: 'user.id' } },
  )

  const refreshToken = await reply.jwtSign(
    { role: 'user.role' },
    { sign: { sub: 'user.id', expiresIn: '7d' } },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
