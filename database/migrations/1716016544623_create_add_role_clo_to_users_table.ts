import { BaseSchema } from '@adonisjs/lucid/schema'
import Roles from '#enums/roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('role').checkIn(["ADMIN", "USER"]).defaultTo('USER')
      table.enu('role', Object.values(Roles)).notNullable().defaultTo(Roles.USER)
    })
  }

  async down() {
    this.schema.table(this.tableName, (t) => t.dropColumn('role'))
  }
}