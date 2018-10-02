const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: {
      name: "JKR",
      age: 98
    }
  },
  {
    title: "Jurassic Park",
    author: {
      name: "Michael Crichton",
      age: 33
    }
  }
];

/**
 * Pushes a book to database. Returns the book.
 * @param {Book} book Book type, see schema
 */
export const addBook = book => {
  books.push(book);
  return book;
};

/**
 * Create a book object. Returns the book.
 * @param {String} title Book title
 * @param {String} name Author Name
 * @param {Int} age Author age
 */
export const newBook = (title, name, age) => ({
  title,
  author: {
    name,
    age
  }
});

export const loadAllBooks = () => books;
