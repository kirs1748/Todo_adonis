import auth from '#config/auth'
import Post from '#models/post'
import FileUploaderService from '#services/file_uploader_service'
import { storePostValidator } from '#validators/post'
import { inject } from '@adonisjs/core'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PostController {

  constructor(private readonly fileUploaderService : FileUploaderService) {}
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const posts = await Post
                          .query()
                          .select('id', 'title', 'thumbnail', 'slug', 'user_id')
                          //.preload('user', (u) => u.select('username'))
    return view.render('posts/posts', {posts})
  }

  /**
   * Display form to create a new record
   */
  async create({view}: HttpContext) {
    return view.render('posts/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth, session, response }: HttpContext) {
    const {content, thumbnail, title} = await request.validateUsing(storePostValidator)
    const slug = stringHelpers.slug(title).toLocaleUpperCase()
    const filePath = await this.fileUploaderService.upload(thumbnail, slug, 'posts')

    await Post.create({
      content, 
      slug, 
      thumbnail : filePath, 
      title, 
      userID : auth.user!.id,
    })
    
    session.flash('success', 'Votre article a bien été publié')
    return response.redirect().toRoute('home')

  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({}: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}