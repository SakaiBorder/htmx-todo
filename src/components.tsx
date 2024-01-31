export type ToDo = {
  id: string
  title: string
  done: boolean
}

export const ToDoItem = (todo: ToDo) => (
  <li class="w-auto flex items-center text-center text-gray-700 bg-gray-200 hover:bg-gray-300 p-4 outline-none hover:shadow-outline mt-1">
    <div class="w-1/2 flex-1 break-words">{todo.title}</div>
    <div class="w-20 flex item-center justify-center flex-1">
      <label>Done</label>
      <input
        type="checkbox"
        hx-patch="/todos/<%= todo.id %>"
        hx-trigger="click delay:100ms"
        hx-disabled-elt="this"
        class="form-checkbox bg-teal-500 mt-1 ml-2"
        checked={todo.done}
      />
    </div>
    <div class="w-20 flex-1">
      <button
        hx-delete={`/todos/${todo.id}`}
        hx-target="#todo-list"
        hx-swap="innerHTML"
        hx-disabled-elt="this"
        class="h-8 bg-pink-300 hover:bg-pink-600 focus:outline-none focus:shadow-outline rounded pr-2 pl-2 pb-1">remove</button>
    </div>
  </li>
)

export const ToDoList = (props: {todoItems: ToDo[]}) => (
  <ul id="todo-list">
    { props.todoItems.map(item => ToDoItem(item)) }
  </ul>
)

export const ToDoForm = () => (
  <form
    hx-post="/todos"
    hx-target="#todo-list"
    hx-swap="beforeend"
    class="add-todo flex justify-end mt-1"
  >
    <input
      name="title"
      type="text"
      placeholder="write a thing to do"
      class="bg-gray-200 hover:bg-gray-300 hover:border-gray-300 outline-none hover:shadow-outline rounded-lg mr-1 pl-2"
      autofocus
    />
    <button
      hx-disabled-elt="this"
      class="bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline rounded py-1 px-3"
    >Add</button>
  </form>
)