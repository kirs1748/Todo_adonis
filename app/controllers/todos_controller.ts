import Todo from '#models/todo'
import { updateTodoValidator } from '#validators/todo'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
    async index({ view, request }: HttpContext) {
        const page = request.input('page', 1)
        const limit = 9
        const todos = await Todo
                                .query()
                                .orderBy('created_at', 'desc')
                                .paginate(page, limit)
        todos.baseUrl('/todos')
        return view.render("todos/index", {todos})
    }

    async show({ params, view }: HttpContext) {
        const todo = await Todo.find(params.id)
        return view.render("todos/show", {todo})
    }

    async edit({ view, params:{id} }: HttpContext) {
        const todo = await Todo.findOrFail(id)
        return view.render('todos/edit', {todo})
    }

    async update({ request, response, params:{id} }: HttpContext) {
        const todo = await Todo.findOrFail(id)
        const data = await request.validateUsing(updateTodoValidator)
        await todo.merge({ ...data }).save()
        response.redirect().toRoute("todos/index", [todo])
    }

    async store({ request, response }: HttpContext) {
        //return request
        const todo = new Todo()
        todo.name = request.input('name')
        todo.description = request.input('description')
        await todo.save()
        response.redirect().toRoute('todos/index', [ todo.id ])
    }

    async destroy({ params, response }: HttpContext) {
        const todo = await Todo.findOrFail(params.id)
        await todo.delete()
        response.redirect().toRoute('todos/index', [ todo.id ])
    }

    async create({ view }: HttpContext) {
        return view.render('todos/create')
    }
}