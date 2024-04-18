import vine from '@vinejs/vine'

export const createTodoValidator = vine.compile(
    vine.object({
      name: vine.string().trim(),
      description: vine.string().trim().escape()
    })
  )
  
  export const updateTodoValidator = vine.compile(
    vine.object({
      name: vine.string().trim(),
      description: vine.string().trim().escape()
    })
  )