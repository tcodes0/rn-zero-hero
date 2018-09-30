import { ApolloServer, gql } from "apollo-server";
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
    name: String
    age: Int
  }
  type Query {
    books: [Book]
    authors: [Author]
    isUser(name: String): Boolean
  }
  type Mutation {
    addBook(title: String, author: AuthorInput): Book
    addUser(name: String): User
  }
`;

const typeDefs = [BookType.typeDefs, AuthorType.typeDefs, UserType.typeDefs];

const resolvers = {
  Query: {
    ...BookType.resolvers,
    ...AuthorType.resolvers,
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
