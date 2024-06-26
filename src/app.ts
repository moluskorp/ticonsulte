import fastify from 'fastify'
import cors from '@fastify/cors'
import { appRoutes } from './http/routes'
import { errorHandler } from './error-handler'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import fastifyCookie from '@fastify/cookie'
import { companiesRoutes } from './http/controllers/companies/routes'
import { branchOfficeRoutes } from './http/controllers/branch_offices/routes'
import { entrancesRoutes } from './http/controllers/entrances/routes'
import { visitorsRoutes } from './http/controllers/visitors/routes'
import { devicesRoutes } from './http/controllers/devices/routes'
import { usersRoutes } from './http/controllers/users/routes'

export const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d',
  },
})

app.register(fastifyCookie)

app.register(appRoutes)
app.register(branchOfficeRoutes)
app.register(companiesRoutes)
app.register(devicesRoutes)
app.register(entrancesRoutes)
app.register(visitorsRoutes)
app.register(usersRoutes)

app.setErrorHandler(errorHandler)
