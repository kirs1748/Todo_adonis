import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ isPrimary: true })
  declare title: string

  @column({ isPrimary: true })
  declare slug: string

  @column({ isPrimary: true })
  declare content: string

  @column({ isPrimary: true })
  declare thumbnail: string

  @column({ isPrimary: true })
  declare userID: number

  @belongsTo(() => User)
  declare user : BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}