import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { html } from 'hono/html'
import { jsxRenderer } from 'hono/jsx-renderer'

import { v4 as uuid } from 'uuid'

import { ToDoForm, ToDoItem, ToDoList } from './components'

const app = new Hono()

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

const view = jsxRenderer(({ children }) => {
  return html`
  <!DOCTYPE html>
  <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>HTMX TODO</title>
      <script defer src="https://unpkg.com/htmx.org@1.9.10"></script>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
      <body>
        ${children}
      </body>
    </html>
  `
})

app.get('*', view)

app.get('/', async (c) => {
  return c.render(
    <section class="w-10/12 m-auto text-gray-700">
      <header class="p-1 font-bold">HTMX TODO</header>
      <main>
        <ToDoList todoItems={todos} />
        <ToDoForm />
      </main>
    </section>
  )
})

app.post('/todos', async (c) => {
  const post = await c.req.parseBody<{title: string}>()

  const todo = {
    id: uuid(),
    title: post.title,
    done: false
  }

  todos.push(todo)

  return c.html(ToDoItem(todo))
})

app.patch('/todos/:id', async (c) => {
  const id = c.req.param('id')
  const todo = todos.find(todo => todo.id === id)

  if (todo) {
    todo.done = !todo?.done
  }

  return c.html(ToDoList({todoItems: todos}))
})

app.delete('/todos/:id', async (c) => {
  const id = c.req.param('id')
  const index = todos.findIndex(todo => todo.id === id)

  todos.splice(index, 1)

  return c.html(ToDoList({todoItems: todos}))
})

const port = 8080
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
