import 'dotenv/config'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastify from 'fastify'
import { resolve } from 'node:path'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'
import { uploadRoutes } from './routes/upload'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname,'../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true, // todas URLs de front end podem acessar o backend, em produção ficaria ['http://localhost:3333' , 'http:// site']
})

app.register(jwt, {
  secret: 'capsula'
})

app.get('/health', async (request, reply) => {
  return { status: 'online' }
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
  port: Number(process.env.PORT) || 3333,
  })
  .then(() => {
  console.log(`👩🏽‍💻HTTP server running on http://localhost:${process.env.PORT}`)
  console.log("oi")
  })