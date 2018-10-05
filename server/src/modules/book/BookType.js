import * as BookLoader from "./BookLoader";

const { addBook, newBook } = BookLoader;

export const typeDefs = `
  type Book {
    title: String!
    author: Author!
  }
`;

export const resolvers = {
  // eslint-disable-next-line arrow-body-style
  books: (root, args, { auth }) => {
    if (auth) {
      return BookLoader.loadAllBooks();
    }
    return null;
  },
  dev_books: () => BookLoader.loadAllBooks()
};

export const mutations = {
  addBook: (root, args, { auth }) => {
    if (auth) {
      const book = newBook(args.title, args.author.name, args.author.age);
      return addBook(book);
    }
    return null;
  }
};
