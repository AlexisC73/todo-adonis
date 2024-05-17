import Todo from '#models/todo'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  async create({ response }: HttpContext) {
    const newTodo = new Todo()
    newTodo.name = 'Learn AdonisJS'
    await newTodo.save()
    return response.ok(null)
  }

  async getWithId({ response, params }: HttpContext) {
    const todo = await Todo.find(params.id)
    if (!todo) {
      return response.notFound({ message: 'Todo not found' })
    }
    return response.ok(todo)
  }
}
