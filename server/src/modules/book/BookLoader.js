import mongoose from "mongoose";
import BookModel from "./BookModel";
import addAuthor from "../author/AuthorLoader";

const { ObjectId } = mongoose.Types;

export const addBook = ({ title, author: bookAuthor }) => {
  return addAuthor({ ...bookAuthor }).then(author => {
    const _id = new ObjectId();
    const book = new BookModel({ title, author, _id });
    return book.save();
  });
};

export const loadAllBooks = ({ skip, limit = 5 }) => {
  return BookModel.find({}, null, { skip, limit })
    .populate("author")
    .then(result => {
      console.log("sending to client", result.map(r => r.title));
      return result;
    });
};
