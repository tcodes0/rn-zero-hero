import * as BookLoader from "./BookLoader";
import { validateToken } from "../user/UserLoader";

const { addBook, newBook } = BookLoader;

export const typeDefs = `
  type Book {
    title: String
    author: Author
  }
`;

export const resolvers = {
  books: (root, args) =>
    validateToken(args.token)
      .then(() => BookLoader.loadAllBooks())
      .catch(e => {
        if (e) throw e;
      }),
  dev_books: () => BookLoader.loadAllBooks()
};

export const mutations = {
  addBook: (root, args) =>
    validateToken(args.token)
      .then(() => {
        const book = newBook(args.title, args.author.name, args.author.age);
        return addBook(book);
      })
      .catch(e => {
        if (e) throw e;
      })
};
