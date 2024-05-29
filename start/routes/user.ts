import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import UsersController from '#controllers/users_controller'

router.get('/user', [UsersController, 'index']).as("user").use(middleware.auth())