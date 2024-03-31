import Todo from '#models/todo'
import Factory from '@adonisjs/lucid/factories'

export const TodoFactory = Factory.define(Todo, ({ faker }) => {
  return {
    name: faker.lorem.sentence(),
    description: faker.lorem.sentence(150)

  }
}).build()