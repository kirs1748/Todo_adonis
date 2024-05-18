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
import { middleware } from '#start/kernel'
import SocialController from '#controllers/social_controller'
import ResetPasswordController from '#controllers/reset_password_controller'
import PostController from '#controllers/post_controller'

router.on('/').render('home').as('home')

router.get('/todos', [TodosController, 'index']).as("todos/index").use(middleware.auth())

router.get('/todos/create', [TodosController, 'create']).as("todos/create").use(middleware.auth())
router.post('/todos/create', [TodosController, 'store']).as("todos/store").use(middleware.auth())

router.get('/todos/edit/:id', [TodosController, 'edit']).as("todos/edit").use(middleware.auth())
router.post('/todos/edit/:id', [TodosController, 'update']).as("todos/update").use(middleware.auth())

router.get('/todo/:id', [TodosController, 'show']).as("todos/show").use(middleware.auth())
router.delete('/todo/:id', [TodosController, 'destroy']).as("todos/destroy").use(middleware.auth())

router.get('/register', [AuthController, 'register']).as("auth/register").use(middleware.guest())
router.post('/register', [AuthController, 'handleRegister']).use(middleware.guest())
router.get('/login', [AuthController, 'login']).as("auth/login").use(middleware.guest())
router.post('/login', [AuthController, 'handleLogin']).use(middleware.guest()).as('auth.handleLogin')

router.get('/forgot-password', [ResetPasswordController, 'forgotPassword']).as("auth/forgot-password").use(middleware.guest())
router.post('/forgot-password', [ResetPasswordController, 'handleForgotPassword']).use(middleware.guest())

router.get('/reset-password', [ResetPasswordController, 'resetPassword']).as("auth/reset-password").use(middleware.guest())
router.post('/reset-password', [ResetPasswordController, 'handleResetPassword']).as("auth/handleReset-password").use(middleware.guest())

router.get('/github/redirect', [SocialController, 'githubRedirect']).use(middleware.guest()).as("github/redirect")
router.get('/github/callback', [SocialController, 'githubCallback']).use(middleware.guest()).as("github/callback")

router.delete('/login', [AuthController, 'logout']).as("auth/logout").use(middleware.auth())


router.get('posts/create', [PostController, 'create']).as("post/create").use(middleware.auth())
router.post('posts/create', [PostController, 'store']).use(middleware.auth())

router.get('posts/:id/edit', [PostController, 'edit']).as('post/edit').where('id', router.matchers.number()).use(middleware.auth())
router.get('posts/:slug/:id', [PostController, 'show']).as('post/show').where('slug', router.matchers.slug()).where('id', router.matchers.number())

router.post('posts/:id/edit', [PostController, 'update']).as('post/update').where('id', router.matchers.number()).use(middleware.auth())
router.delete('posts/:id/delete', [PostController, 'destroy']).as('post/delete').where('id', router.matchers.number()).use(middleware.auth())

router.get('posts', [PostController, 'index']).as('posts')


