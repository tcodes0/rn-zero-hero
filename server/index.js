import { ApolloServer, gql } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";

import * as BookType from "./src/modules/book/BookType";
import * as AuthorType from "./src/modules/author/AuthorType";

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
  }
  type Mutation {
    addBook(title: String, author: AuthorInput): Book
  }
`;

const typeDefs = [BookType.typeDefs, AuthorType.typeDefs];

const resolvers = {
  Query: {
    ...BookType.resolvers,
    ...AuthorType.resolvers
  },
  Mutation: {
    addBook: (root, args, context) => {
      const book = BookType.mutations.newBook(
        args.title,
        args.author.name,
        args.author.age
      );
      return BookType.mutations.addBook(book);
    }
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
