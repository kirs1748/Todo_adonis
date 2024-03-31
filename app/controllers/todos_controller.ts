import Todo from '#models/todo'
import type { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
    async index({ view }: HttpContext) {
        const todos = await Todo.all()
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

    async update({ response, params : {id}, request }: HttpContext) {
        const todo = await Todo.findOrFail(id)
        const data = request.body()
        todo.merge({ ...data }).save()
        response.redirect().toRoute('todos/show', [ todo.id ])

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