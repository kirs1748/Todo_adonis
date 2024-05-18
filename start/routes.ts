/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import './routes/users'
import './routes/todos'
import './routes/posts'

router.on('/').render('home').as('home')
