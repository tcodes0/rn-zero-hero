import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  author: { type: Schema.Types.ObjectId, ref: "Author" }
});

export default mongoose.model("Book", bookSchema);
