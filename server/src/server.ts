import 'dotenv/config'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
  origin: true, // todas URLs de front end podem acessar o backend, em produção ficaria ['http://localhost:3333' , 'http:// site']
})

app.register(jwt, {
  secret: 'capsula'
})

app.register(authRoutes)
app.register(memoriesRoutes)

app
  .listen({
  port: 3333,
  })
  .then(() => {
  console.log('👩🏽‍💻HTTP server running on http://localhost:3333')
  })