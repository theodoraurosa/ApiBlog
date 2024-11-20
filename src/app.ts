import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'
import { usersRoutes } from './modules/users/http/routes'
import { categoriesRoutes } from './modules/categories/http/routes'
import { postRoutes } from './modules/posts/http/routes'
import { commentRoutes } from './modules/comment/http/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(require('@fastify/cors'), {
  hook: 'preHandler',
  delegator: (req: any, callback: any) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  },
})

app.register(fastifyCookie)
app.register(usersRoutes)
app.register(categoriesRoutes)
app.register(postRoutes)
app.register(commentRoutes,)


app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
