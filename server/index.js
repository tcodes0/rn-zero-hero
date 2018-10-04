/* eslint-disable no-console */
import { ApolloServer } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";

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
    login(name: String, password: String): Token
    addBook(title: String, author: AuthorInput, token: String): Book!
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

const schema = makeExecutableSchema({
  typeDefs: [SchemaDefinition, ...typeDefs],
  resolvers
});

const server = new ApolloServer({ schema });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
