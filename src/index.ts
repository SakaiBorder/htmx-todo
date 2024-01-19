import path from 'path'

import { fastify } from 'fastify'
import fastifyView from '@fastify/view'
import ejs from 'ejs'

const server = fastify()
server.register(fastifyView, {
  engine: {
    ejs: ejs,
  },
  root: path.join(__dirname, "../src/views")
})

server.get('/', async (request, reply) => {
  return reply.view('index.ejs', { text: 'ejs' })
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
