import type { Collection, Db } from 'mongodb'
import { ObjectId } from 'mongodb'
import type { TaskDbObject } from '../../generated/graphql'

export const findById = (collection: Collection<TaskDbObject>) => async (id: string | ObjectId) =>
  ObjectId.isValid(id) ? collection.findOne(new ObjectId(id)) : null

export const getAll = (collection: Collection<TaskDbObject>) => async () =>
  collection.find().toArray()

export const create = (collection: Collection<TaskDbObject>) => async (
  id: ObjectId,
  title: string,
  description: string,
  urgent: boolean,
  important: boolean
) =>
  collection
    .insertOne({ _id: id, title, description, urgent, important })
    .then((result) => result.ops[0])

export const factory = (db: Db) => {
  const collection = db.collection<TaskDbObject>('tasks')

  return {
    findById: findById(collection),
    getAll: getAll(collection),
    create: create(collection)
  }
}

export type TasksRepository = ReturnType<typeof factory>
