import * as AuthorLoader from "./AuthorLoader";

export const typeDefs = `
  type Author {
    id: ID!
    name: String!
    age: Int!
  }
  input AuthorInput {
    name: String!
    age: Int!
  }
`;

export const resolvers = {
  authors: () => AuthorLoader.loadAllAuthors()
};
