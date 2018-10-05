import mongoose from "mongoose";
import AuthorModel from "./AuthorModel";

const { ObjectId } = mongoose.Types;

const addAuthor = ({ name, age }) => {
  const _id = new ObjectId();
  const author = new AuthorModel({ name, age, _id });
  return author.save();
};

export default addAuthor;
