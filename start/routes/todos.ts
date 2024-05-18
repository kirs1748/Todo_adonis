import router from '@adonisjs/core/services/router'
import TodosController from '#controllers/todos_controller'
import { middleware } from '#start/kernel'

router.get('/todos', [TodosController, 'index']).as("todos/index").use(middleware.auth())

router.get('/todos/create', [TodosController, 'create']).as("todos/create").use(middleware.auth())
router.post('/todos/create', [TodosController, 'store']).as("todos/store").use(middleware.auth())

router.get('/todos/edit/:id', [TodosController, 'edit']).as("todos/edit").use(middleware.auth())
router.post('/todos/edit/:id', [TodosController, 'update']).as("todos/update").use(middleware.auth())

router.get('/todo/:id', [TodosController, 'show']).as("todos/show").use(middleware.auth())
router.delete('/todo/:id', [TodosController, 'destroy']).as("todos/destroy").use(middleware.auth())