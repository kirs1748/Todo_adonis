import router from '@adonisjs/core/services/router'
import PostController from '#controllers/post_controller'
import { middleware } from '#start/kernel'

router.get('posts/create', [PostController, 'create']).as("post/create").use(middleware.auth())
router.post('posts/create', [PostController, 'store']).use(middleware.auth())

router.get('posts/:id/edit', [PostController, 'edit']).as('post/edit').where('id', router.matchers.number()).use(middleware.auth())
router.get('posts/:slug/:id', [PostController, 'show']).as('post/show').where('slug', router.matchers.slug()).where('id', router.matchers.number())

router.post('posts/:id/edit', [PostController, 'update']).as('post/update').where('id', router.matchers.number()).use(middleware.auth())
router.delete('posts/:id/delete', [PostController, 'destroy']).as('post/delete').where('id', router.matchers.number()).use(middleware.auth())

router.get('posts', [PostController, 'index']).as('posts')