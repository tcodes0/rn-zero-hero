/* eslint-disable no-console */
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { validateToken } from "./src/modules/user/UserLoader";
import "./src/services/database";

import * as BookType from "./src/modules/book/BookType";
import * as AuthorType from "./src/modules/author/AuthorType";
import * as UserType from "./src/modules/user/UserType";
import * as DateType from "./src/modules/date/DateType";

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
  type Query {
    books(skip: Int, limit: Int): [Book]
    dev_books(skip: Int, limit: Int): [Book]
    dev_users: [User]
  }
  type Mutation {
    login(name: String, password: String, noAuth: Boolean): Token!
    addBook(title: String, author: AuthorInput): Book
    addUser(name: String, password: String, noAuth: Boolean): Token!
    dev_addBook(title: String, author: AuthorInput): Book
  }
`;

const typeDefs = [
  BookType.typeDefs,
  AuthorType.typeDefs,
  UserType.typeDefs,
  DateType.typeDefs
];

const resolvers = {
  Query: {
    ...BookType.resolvers,
    ...UserType.resolvers
  },
  Mutation: {
    ...BookType.mutations,
    ...UserType.mutations
  },
  ...DateType.resolvers
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
