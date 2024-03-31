/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import TodosController from '#controllers/todos_controller'
import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'

router.on('/').render('home').as('home')
router.on('/contact').render('pages/contact')
router.on('/about').render('pages/about')

router.get('/todos', [TodosController, 'index']).as("todos/index")

router.get('/todos/create', [TodosController, 'create']).as("todos/create")
router.post('/todos/create', [TodosController, 'store']).as("todos/store")

router.get('/todos/edit/:id', [TodosController, 'edit']).as("todos/edit")
router.post('/todos/edit/:id', [TodosController, 'update']).as("todos/update")

router.get('/todo/:id', [TodosController, 'show']).as("todos/show")
router.delete('/todo/:id', [TodosController, 'destroy']).as("todos/destroy")

router.get('/register', [AuthController, 'register']).as("auth/register")
router.post('/register', [AuthController, 'handleRegister'])
router.get('/login', [AuthController, 'login']).as("auth/login")
router.post('/login', [AuthController, 'handleLogin'])

router.delete('/login', [AuthController, 'logout']).as("auth/logout")

