import * as BookLoader from "./BookLoader";

const { addBook, newBook } = BookLoader;

export const typeDefs = `
  type Book {
    title: String
    author: Author
  }
`;

export const resolvers = {
  books: () => BookLoader.loadAllBooks()
};

export const mutations = {
  addBook: (root, args) => {
    const book = newBook(args.title, args.author.name, args.author.age);
    return addBook(book);
  }
};
