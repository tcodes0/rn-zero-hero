import { loadAllBooks, addBook } from "./BookLoader";

export const typeDefs = `
  type Book {
    title: String!
    author: Author!
  }
`;

export const resolvers = {
  books: (root, args, { auth }) => {
    if (auth) {
      return loadAllBooks(args);
    }
    return null;
  },
  dev_books: (root, args) => loadAllBooks(args)
};

export const mutations = {
  addBook: (root, args, { auth }) => {
    if (auth) {
      return addBook(args);
    }
    return null;
  },
  dev_addBook: (root, args) => addBook(args)
};
