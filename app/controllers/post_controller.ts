import Post from '#models/post'
import FileUploaderService from '#services/file_uploader_service'
import { storePostValidator, updatePostValidator } from '#validators/post'
import { inject } from '@adonisjs/core'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'
import { Marked } from "marked"
import  {  markedHighlight  }  from  "marked-highlight" 
import  hljs  from  'highlight.js' 
import * as fs from 'node:fs'
import { unlink } from 'node:fs/promises'
import PostPolicy from '#policies/post_policy'

@inject()
export default class PostController {

  constructor(private readonly fileUploaderService : FileUploaderService) {}
  /**
   * Display a list of resource
   */
  async index({ view, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 4
    const posts = await Post
                          .query()
                          .select('id', 'title', 'thumbnail', 'slug', 'user_id')
                          .preload('user', (u) => u.select('username'))
                          .orderBy('created_at', 'desc')
                          .paginate(page, limit)
    

    posts.baseUrl('/posts')
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
    const slug = stringHelpers.slug(title, {lower : true})
    const filePath = await this.fileUploaderService.upload(thumbnail, slug, 'posts')

    await Post.create({
      content, 
      slug, 
      thumbnail : filePath, 
      title, 
      userID : auth.user!.id,
    })
    
    session.flash('success', 'Votre article a bien été publié')
    return response.redirect().toRoute('posts')

  }

  /**
   * Show individual record
   */
  async show({ params, response, view }: HttpContext) {
    const {slug, id} = params
    const post = await Post.findByOrFail('id', id)
    const marked = new Marked(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang, info) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        }
      })
    );
    const content = marked.parse(post.content)
    if(post.slug !== slug) {
      return response.redirect().toRoute('post/show', {slug : post.slug, id})
    }
    return view.render('posts/show', {content, postTitle : post.title})
  }

  /**
   * Edit individual record
   */
  async edit({ params, view, bouncer, response, session }: HttpContext) {
    const {id} = params
    const post = await Post.findByOrFail('id', id)
    if(await bouncer.with(PostPolicy).denies('alterPost', post)) {
      session.flash('error', 'Action interdite')
      response.redirect().back()
    }
    return view.render('posts/edit', {post})
  }

  /**
   * Handle form submission for the edit action
   */
  async update({params, request, session, response, bouncer}: HttpContext) {
    const {id} = params
    const { content, thumbnail, title } = await request.validateUsing(updatePostValidator)
    const post = await Post.findByOrFail('id', id)
    if(await bouncer.with(PostPolicy).denies('alterPost', post)) {
      session.flash('error', 'Action interdite')
      response.redirect().back()
    }
    const slug = post.title !== title && stringHelpers.slug(title, {lower : true})
    if(thumbnail) {
      await unlink(`public/${post.thumbnail}`)
      const filePath = await this.fileUploaderService.upload(thumbnail, '', 'posts')
      post.merge({thumbnail : filePath})
    }
    if(slug) post.merge({title, slug})
    if(post.content !== content) post.merge({content})
    await post.save()

    session.flash('success', 'Votre article a bien été modifié')
    return response.redirect().toRoute('/posts')
  }


  /**
   * Delete record
   */
  async destroy({ session, response, request, bouncer }: HttpContext) {
    const postId = request.param('id')
    console.log('postId', postId)
    const post = await Post.findOrFail(request.param('id'))
    if(await bouncer.with(PostPolicy).denies('alterPost', post)) {
      session.flash('error', 'Action interdite')
      response.redirect().back()
    }
    console.log('posts', post)
    fs.unlink(`public/${post.thumbnail}`, (err) => {
      if (err) throw err; 
    }); 
    await post.delete()

    session.flash('success', 'Votre contenu a bien été supprimé')
    return response.redirect().toRoute('/posts')

  }
}