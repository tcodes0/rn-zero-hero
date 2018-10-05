/* eslint-disable no-console */
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { validateToken } from "./src/modules/user/UserLoader";

import * as BookType from "./src/modules/book/BookType";
import * as AuthorType from "./src/modules/author/AuthorType";
import * as UserType from "./src/modules/user/UserType";

const dbAddress = {
  production: "mongodb://our-awesome/server/db",
  development: "mongodb://localhost:27017/test2"
};

mongoose.connect(
  dbAddress.development,
  { useNewUrlParser: true }
);
mongoose.connection.on("error", () => {
  console.log("database connection error");
});

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
    books(skip: Int, limit: Int, token: String): [Book]
    dev_books(skip: Int, limit: Int): [Book]
    dev_users: [User]
  }
  type Mutation {
    login(name: String, password: String): Token!
    addBook(title: String, author: AuthorInput, token: String): Book
    dev_addBook(title: String, author: AuthorInput): Book
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
