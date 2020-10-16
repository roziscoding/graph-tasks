import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  """
  A task
  """
  type Task @entity {
    """
    Hex representation of the ObjectId
    """
    id: ID! @id
    title: String! @column
    description: String! @column
    """
    Does this task have high impact?
    """
    important: Boolean! @column
    """
    Does this task need to be completed ASAP?
    """
    urgent: Boolean! @column
  }

  """
  Params required to create a new task
  """
  input TaskInput {
    title: String!
    description: String!
    important: Boolean
    urgent: Boolean
  }

  type Mutation {
    addTask(taskData: TaskInput!): Task
  }

  type Query {
    """
    Get a list of tasks or a single one, filtered by id
    """
    tasks(id: ID): [Task]!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`
