import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { TodoFactory } from '#database/factories/Todofactory'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await TodoFactory.createMany(12)
  }
}