import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      username: "admin",
      email: "admin@admin.fr",
      password: "0123456789",
      role: "ADMIN",
      thumbnail: "users/admin.png"
    })
  }
}