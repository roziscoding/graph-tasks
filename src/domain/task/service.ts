import { ObjectId } from 'mongodb'
import type { TasksRepository } from './repository'

export const find = (repository: TasksRepository) => async (id?: string | null) => {
  if (id) return [await repository.findById(id)]

  return repository.getAll()
}

export const create = (repository: TasksRepository) => async (
  title: string,
  description: string,
  urgent: boolean = false,
  important: boolean = false
) => repository.create(new ObjectId(), title, description, urgent, important)

export const factory = (repository: TasksRepository) => ({
  find: find(repository),
  create: create(repository)
})

export type TaskService = ReturnType<typeof factory>
