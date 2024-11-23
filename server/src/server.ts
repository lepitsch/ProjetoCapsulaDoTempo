import cors from '@fastify/cors'
import fastify from 'fastify'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
  origin: true, // todas URLs de front end podem acessar o backend, em produção ficaria ['http://localhost:3333' , 'http:// site']
})
app.register(memoriesRoutes)

app
  .listen({
  port: 3333,
  })
  .then(() => {
  console.log('👩🏽‍💻HTTP server running on http://localhost:3333')
  })