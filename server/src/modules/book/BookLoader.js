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

export const loadAllBooks = ({ skip, limit }) => {
  return BookModel.find({}, null, { skip, limit })
    .populate("author")
    .then(result => {
      return result;
    });
};
