import { Resolvers } from '../../generated/graphql'
import { DeepPartial } from '../../types/DeepPartial'
import { TaskService } from './service'

export const factory = (service: TaskService): DeepPartial<Resolvers> => ({
  Task: {
    id: (parent) => parent._id.toHexString()
  },
  Query: {
    tasks: (_, { id }) => service.find(id)
  },
  Mutation: {
    addTask: (_, { taskData: { title, description, urgent, important } }) =>
      service.create(title, description, urgent, important)
  }
})
