import { AuthenticationError } from "apollo-server-express";
import { loadAllBooks, addBook } from "./BookLoader";

export const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: Author!
  }
`;

export const resolvers = {
  books: (root, args, { auth }) => {
    if (auth) {
      return loadAllBooks(args);
    }
    throw AuthenticationError("Please signing again.");
  },
  dev_books: (root, args) => loadAllBooks(args)
};

export const mutations = {
  addBook: (root, args, { auth }) => {
    if (auth) {
      return addBook(args);
    }
    throw AuthenticationError("Please signing again.");
  },
  dev_addBook: (root, args) => addBook(args)
};
