import path from 'path'

import { fastify } from 'fastify'
import fastifyView from '@fastify/view'
import ejs from 'ejs'
import { v4 as uuid } from 'uuid'

const server = fastify()
server.register(fastifyView, {
  engine: {
    ejs: ejs,
  },
  root: path.join(__dirname, "../src/views")
})

const todos = [
  {
    id: uuid(),
    title: "Wash Dishes",
    done: true    
  },
  {
      id: uuid(),
      title: "Go to Library",
      done: false
  },
  {
      id: uuid(),
      title: "Study Math",
      done: false
  }
]

server.get('/', async (request, reply) => {
  return reply.view('index.ejs', { todos: todos })
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
