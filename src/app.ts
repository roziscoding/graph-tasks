import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb'
import { ApolloServer, IResolvers, makeExecutableSchema } from 'apollo-server-express'
import express from 'express'
import { MongoClient } from 'mongodb'
import * as Task from './domain/task'

export const start = async () => {
  const db = await MongoClient.connect('mongodb://localhost:27017/graphTask', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((connection) => connection.db('tasks'))

  const task = Task.factory(db)

  const schema = makeExecutableSchema({
    typeDefs: [DIRECTIVES, task.typeDefs],
    resolvers: [task.resolvers] as IResolvers[]
  })

  const server = new ApolloServer({ schema, tracing: true })

  const app = express()

  server.applyMiddleware({ app })

  app.listen({ port: 3000 }, () => {
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
  })
}
