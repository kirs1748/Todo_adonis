/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import './routes/auth.js'
import './routes/todos.js'
import './routes/posts.js'
import './routes/user.js'

router.on('/').render('home').as('home')
