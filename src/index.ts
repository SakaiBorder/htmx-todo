import path from 'path'

import { serve } from '@hono/node-server'
import { Hono } from 'hono'

// import { fastify } from 'fastify'
// import fastifyView from '@fastify/view'
// import fastifyFormBody from '@fastify/formbody'
// import ejs from 'ejs'
import { v4 as uuid } from 'uuid'

// const server = fastify()
const app = new Hono()

// app.get('/', (c) => c.text('Hono!'))
// server.register(fastifyView, {
//   engine: {
//     ejs: ejs,
//   },
//   root: path.join(__dirname, "../src/views")
// })
// server.register(fastifyFormBody)

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

// server.get('/', async (request, reply) => {
//   return reply.view('index.ejs', { todos: todos })
// })

// server.post('/todos', async (request, reply) => {
//   const body = request.body as { title: string }

//   const todo = {
//     id: uuid(),
//     title: body.title,
//     done: false
//   }

//   todos.push(todo)

//   return reply.view('includes/todo-item.ejs', { todo })
// })

// server.patch('/todos/:id', async (request, reply) => {
//   const { id } = request.params as { id: string }
//   const todo = todos.find(todo => todo.id === id)

//   if (todo) {
//     todo.done = !todo?.done
//   }

//   return reply.view('includes/todo-list.ejs', { todos })
// })

// server.delete('/todos/:id', async (request, reply) => {
//   const { id } = request.params as { id: string }
//   const index = todos.findIndex(todo => todo.id === id)

//   todos.splice(index, 1)

//   return reply.view('includes/todo-list.ejs', { todos })
// })

// server.listen({ port: 8080 }, (err, address) => {
//   if (err) {
//     console.error(err)
//     process.exit(1)
//   }
//   console.log(`Server listening at ${address}`)
// })
const port = 8080
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
