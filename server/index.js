/* eslint-disable no-console */
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { validateToken } from "./src/modules/user/UserLoader";

import * as BookType from "./src/modules/book/BookType";
import * as AuthorType from "./src/modules/author/AuthorType";
import * as UserType from "./src/modules/user/UserType";

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
  input AuthorInput {
    name: String!
    age: Int!
  }
  type Token {
    token: String!
  }
  type Query {
    books(token: String): [Book]
    dev_books: [Book]
    dev_users: [User]
  }
  type Mutation {
    login(name: String, password: String): Token!
    addBook(title: String, author: AuthorInput, token: String): Book
    addUser(name: String, password: String): Token!
  }
`;

const typeDefs = [BookType.typeDefs, AuthorType.typeDefs, UserType.typeDefs];

const resolvers = {
  Query: {
    ...BookType.resolvers,
    ...UserType.resolvers
  },
  Mutation: {
    ...BookType.mutations,
    ...UserType.mutations
  }
};

const server = new ApolloServer({
  typeDefs: [SchemaDefinition, ...typeDefs],
  resolvers,
  context: validateToken
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
